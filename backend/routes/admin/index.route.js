const configSystem = require("../../config/system") 

const dashboardRouter = require('./dashboard.route');

module.exports = (app) => {
  const ADMIN_PATH = '/' + configSystem.adminPrefix;

  app.use(
    ADMIN_PATH + "/dashboard",
    dashboardRouter
  );

}
