const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser'); 
const { graphqlHTTP } = require('express-graphql');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

const graphqlSchema = require('./graphql/schema/schema');
const graphqlResolvers = require('./graphql/resolvers/resolvers');
const isAuth = require('./middleware/is-auth');

const app = express();

app.use(bodyParser.json());

app.use(cors({
  origin: "http://localhost:3000",
  credentials: true,
}));
app.use(cookieParser());
app.use(isAuth);

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

mongoose
  .connect(process.env.BLN_CONNECT)
  .then(() => {
    app.listen(5000);
  })
  .catch((err) => {
    console.log(err);
  });
