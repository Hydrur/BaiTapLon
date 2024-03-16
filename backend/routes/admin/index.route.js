const configSystem = require("../../config/system") 

const dashboardRouter = require('./dashboard.route');
const bookRouter = require('./book.route');

module.exports = (app) => {
  const ADMIN_PATH = '/' + configSystem.adminPrefix;

  app.use(
    ADMIN_PATH + "/dashboard",
    dashboardRouter
  );

  app.use(
    ADMIN_PATH + "/books",
    bookRouter
  );

}
