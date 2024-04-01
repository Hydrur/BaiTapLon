const bookRoutes = require("./book.route");
const readerRoutes = require("./reader.route");
const authRoutes = require("./auth.route");

const authMiddleware = require("../../middlewares/client/auth.middleware");

module.exports = (app) => {  
  
  app.use("/books", authMiddleware.authRequire, bookRoutes);

  app.use("/reader", readerRoutes);

  app.use("/auth", authRoutes);


}