const express = require('express');
const cookieParser = require('cookie-parser');
const { graphqlHTTP } = require('express-graphql');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();
const config = require('./utils/config');

const graphqlSchema = require('./graphql/schema/schema');
const graphqlResolvers = require('./graphql/resolvers/resolvers');
const isAuth = require('./middleware/is-auth');
// const notificationRoutes = require('./routes/notification');
const { connectToDatabases } = require('./db/connection');
// const processNotifications = require('./notification-microservice/worker-service');

const app = express();

app.use(bodyParser.json());

app.use(
  cors({
    origin: 'http://localhost:3000',
    credentials: true,
  })
);
app.use(cookieParser());
app.use(isAuth);

// app.use('/api', notificationRoutes);

// app.use(
//   '/graphql',
//   graphqlHTTP({
//     schema: graphqlSchema,
//     rootValue: graphqlResolvers,
//     graphiql: true,
//   })
// );

//COOKIES
const cookeHandler = require('./middleware/cookie-handler');
app.use('/cookies', cookeHandler);

// ROUTES
const userRoutes = require('./routes/user-routes/user-routes');
app.use('/user', userRoutes);
const courseRoutes = require('./routes/course-routes/course-routes');
app.use('/course', courseRoutes);

app.use("/test", (req, res) => {
  res.send("hello world!");
})


connectToDatabases()
  .then(() => {
    app.listen(config.PORT);
    console.log(`Server running port ${config.PORT}`);
    // processNotifications();
  })
  .catch((err) => {
    console.error(err);
  });
