const express = require('express');
const cookieParser = require('cookie-parser');
const { graphqlHTTP } = require('express-graphql');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();
const config = require('./utils/config');
const { makeApiRequest } = require('./apiRequest');
const axios = require('axios');
const qs = require('qs');
const path = require('path');
const fs = require('fs');

const graphqlSchema = require('./graphql/schema/schema');
const graphqlResolvers = require('./graphql/resolvers/resolvers');
const isAuth = require('./middleware/is-auth');
const notificationRoutes = require('./routes/notification');
const { connectToDatabases } = require('./db/connection');
const processNotifications = require('./notification-microservice/worker-service');

const app = express();

const {
  CLIENT_ID,
  CLIENT_SECRET,
  REDIRECT_URI
} = process.env;

app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }));

app.use(
  cors({
    credentials: true,
    origin: 'http://localhost:3000',
  })
);
app.use(cookieParser());
app.use(isAuth);


app.use('/api', notificationRoutes);

app.use(
  '/graphql',
  graphqlHTTP({
    schema: graphqlSchema,
    rootValue: graphqlResolvers,
    graphiql: true,
  })
);

//COOKIES
const cookeHandler = require('./middleware/cookie-handler');
app.use('/cookies', cookeHandler);

// ROUTES
const userRoutes = require('./routes/user-routes/user-routes');
app.use('/user', userRoutes);
const courseRoutes = require('./routes/course-routes/course-routes');
app.use('/course', courseRoutes);
const adminRoutes = require('./routes/admin-routes/admin-routes')
app.use('/admin', adminRoutes);
const aiRoutes = require('./routes/ai-routes/ai-routes')
app.use('/ai', aiRoutes);

app.use("/test", (req, res) => {
  res.send("hello world!");
})

//highlight function developing --zelong
app.use("/highlight", (req, res) => {
  const selectedText = req.body.selectedText;
  console.log(selectedText);
});

app.get('/auth', (req, res) => {
  const authUrl = `https://accounts.google.com/o/oauth2/auth?response_type=code&client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&scope=https://www.googleapis.com/auth/drive&access_type=offline`;
  console.log('clientID:' + CLIENT_ID)
  res.redirect(authUrl);
});


app.get('/callback', async (req, res) => {
  const code = req.query.code;

  try {
    const response = await axios.post('https://oauth2.googleapis.com/token', qs.stringify({
      code,
      client_id: CLIENT_ID,
      client_secret: CLIENT_SECRET,
      redirect_uri: REDIRECT_URI,
      grant_type: 'authorization_code'
    }), {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    });
    console.log('Token response:', response.data);
    const { access_token, refresh_token, expires_in } = response.data;

   
    console.log('Access Token:', access_token);
    console.log('Refresh Token:', refresh_token);
    console.log('Expires In:', expires_in);

    // Load existing .env content
    const envFilePath = path.resolve(__dirname, '.env');
    let envContent = fs.readFileSync(envFilePath, 'utf8');

   
    const updatedEnvContent = envContent.split('\n').map(line => {
      if (line.startsWith('ACCESS_TOKEN=')) {
        return `ACCESS_TOKEN='${access_token}'`;
      } else if (line.startsWith('REFRESH_TOKEN=')) {
        return `REFRESH_TOKEN='${refresh_token}'`;
      } else if (line.startsWith('TOKEN_EXPIRY=')) {
        return `TOKEN_EXPIRY='${(Date.now() + expires_in * 1000).toString()}'`;
      }
      return line;
    }).join('\n');

    fs.writeFileSync(envFilePath, updatedEnvContent.trim());

    res.send('Authentication successful');
  } catch (error) {
    console.error('Error exchanging authorization code for tokens:', error.response ? error.response.data : error.message);
    res.status(500).send('Authentication failed.');
  }
});

// Add this route to use the Google Cloud API with refreshed token
app.get('/api/data', async (req, res) => {
  try {
    const data = await makeApiRequest();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch data' });
  }
});

connectToDatabases()
  .then(() => {
    app.listen(config.PORT);
    console.log(`Server running port ${config.PORT}`);
    processNotifications();
  })
  .catch((err) => {
    console.error(err);
  });
