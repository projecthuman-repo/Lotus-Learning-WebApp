const authResolver = require('./auth');
const coursesResolver = require('./course');
const enrollmentResolver = require('./enrollment');

const rootResolver = {
  ...authResolver,
  ...coursesResolver,
  ...enrollmentResolver,
};

module.exports = rootResolver;
