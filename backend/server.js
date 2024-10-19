const express = require('express');
const cookieParser = require('cookie-parser');
const { graphqlHTTP } = require('express-graphql');
const bodyParser = require('body-parser');
const cors = require('cors');
const https = require('https'); 
const fs = require('fs'); 
require('dotenv').config();
const config = require('./utils/config');

const graphqlSchema = require('./graphql/schema/schema');
const graphqlResolvers = require('./graphql/resolvers/resolvers');
const isAuth = require('./middleware/is-auth');
const { connectToDatabases } = require('./db/connection');

const app = express();

// Increase body size limit to handle larger payloads
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }));

const corsOptions = {
  origin: 'https://lotuslearning.world',  // Frontend origin
  credentials: true,  // Allow cookies and credentials
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],  // Allowed methods
  allowedHeaders: ['Origin', 'Content-Type', 'Accept', 'Authorization'],  // Allow specific headers
};

app.use(cors(corsOptions));

// Handle preflight (OPTIONS) requests for all routes
app.options('*', cors(corsOptions));

app.use(cookieParser());
app.use(isAuth);

// Middleware and routes
const cookeHandler = require('./middleware/cookie-handler');
app.use('/cookies', cookeHandler);

const userRoutes = require('./routes/user-routes/user-routes');
app.use('/user', userRoutes);
const courseRoutes = require('./routes/course-routes/course-routes');
app.use('/course', courseRoutes);
const adminRoutes = require('./routes/admin-routes/admin-routes');
app.use('/admin', adminRoutes);
const aiRoutes = require('./routes/ai-routes/ai-routes');
app.use('/ai', aiRoutes);

app.use("/test", (req, res) => {
  res.send("hello world!");
});

//highlight function developing --zelong
app.use("/highlight", (req, res) => {
  const selectedText = req.body.selectedText;
  console.log(selectedText);
});


// Connect to databases and start server
connectToDatabases()
  .then(() => {
    server.listen(config.PORT, () => {
      console.log(`HTTPS Server running on port ${config.PORT}`);
    });
  })
  .catch((err) => {
    console.error('Database connection error:', err);
  });

