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

app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }));

app.use(
  cors({
    credentials: true,
    origin: ' http://localhost:3000',
  })
);

const logger = require('./logger');
const pino = require('pino-http')({

  logger,
});
app.use(pino);
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



connectToDatabases()
  .then(() => {
    app.listen(config.PORT);
    let test = 5;
    logger.info(`Server running on port ${config.PORT}`);
    //console.log(`Server running port ${config.PORT}`);
  //  logger.debug({test}, 'Error connecting to the database');
    // processNotifications();
  })
  .catch((err) => {
    logger.error(err, 'Error connecting to the database');
   // console.error(err);
  });
