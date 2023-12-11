//This code snippet is setting up a Node.js web server using Express, configured for both RESTful and GraphQL APIs, and it connects to a MongoDB database


//Import modules and configs
const express = require('express');
const bodyParser = require('body-parser');
const { graphqlHTTP } = require('express-graphql');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

const graphqlSchema = require('./graphql/schema/schema');
const graphqlResolvers = require('./graphql/resolvers/resolvers');
const isAuth = require('./middleware/is-auth');
// Import the notification routes
const notificationRoutes = require('./routes/notificationRoutes');

const app = express(); //Initializes a new Express application.

app.use(bodyParser.json()); //Parses incoming request bodies in a middleware before your handlers, available under req.body.

app.use(cors());// Enables CORS for all routes

app.use(isAuth); //Your custom authentication middleware to validate requests

// Here we're adding the notification routes to the Express app
//Mounts the notificationRoutes on the /api path
app.use('/api', notificationRoutes);


//Sets up a GraphQL endpoint at /graphql.
//Configures the GraphQL server with your schema, resolvers, and enables the GraphiQL interface for testing and exploration.

app.use(
  '/graphql',  
  graphqlHTTP({
    schema: graphqlSchema,
    rootValue: graphqlResolvers,
    graphiql: true,
  })
);


/*Connects to MongoDB using a connection string from your environment variables (process.env.BLN_CONNECT).
If the database connection is successful, the Express application starts listening for requests on port 5000.
If there is a connection error, it logs the error to the console.
*/
mongoose
  .connect(process.env.BLN_CONNECT)
  .then(() => {
    app.listen(5000);
  })
  .catch((err) => {
    console.log(err);
  });
