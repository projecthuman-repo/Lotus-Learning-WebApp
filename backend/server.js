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

app.use(cors({
  credentials: true,
  origin: 'https://lotuslearning.world', 
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], 
}));

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

// Read SSL certificate files
const privateKey = fs.readFileSync('/etc/letsencrypt/live/lotuslearning.world/privkey.pem', 'utf8');
const certificate = fs.readFileSync('/etc/letsencrypt/live/lotuslearning.world/fullchain.pem', 'utf8');
const ca = fs.readFileSync('/etc/letsencrypt/live/lotuslearning.world/chain.pem', 'utf8');

const credentials = { key: privateKey, cert: certificate, ca: ca };

// Create HTTPS server
const server = https.createServer(credentials, app);

// Initialize WebSocket server on the same HTTPS server
const WebSocket = require('ws');
const wss = new WebSocket.Server({ server, path: '/ws' });

// Handle WebSocket connections
wss.on('connection', (ws, req) => {
  console.log('WebSocket connection established');
  ws.on('message', (message) => {
    console.log('Received message:', message);
    ws.send('Message received');
  });
  ws.on('close', () => {
    console.log('WebSocket connection closed');
  });
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

