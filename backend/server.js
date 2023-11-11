const express = require('express');
const bodyParser = require('body-parser');
const { graphqlHTTP } = require('express-graphql');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

const graphqlSchema = require('./graphql/schema/schema');
const graphqlResolvers = require('./graphql/resolvers/resolvers');
const isAuth = require('./middleware/is-auth');

const app = express();

app.use(bodyParser.json());

app.use(cors());

app.use(isAuth);

app.use(
  '/graphql',
  graphqlHTTP({
    schema: graphqlSchema,
    rootValue: graphqlResolvers,
    graphiql: true,
  })
);

mongoose
  .connect(process.env.BLN_CONNECT)
  .then(() => {
    app.listen(5000);
  })
  .catch((err) => {
    console.log(err);
  });
