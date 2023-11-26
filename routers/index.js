//routers
const categoryRouter = require("./categoryRouter.js");
const subCategoryRouter = require("./subCategoryRouter.js");
const brandRouter = require("./brandRouter.js");
const productRouter = require("./productRouter.js");
const userRouter = require("./userRouter.js");
const authRouter = require("./authRouter.js");
const reviewRouter = require("./reviewRouter.js");
const wishlistRouter = require("./wishlistRouter.js");
const addressRouter = require("./addressRouter.js");
const couponRouter = require("./couponRouter.js");

const mountRoutes = (app) => {
  app.use("/api/v1/categories", categoryRouter);
  app.use("/api/v1/subCategories", subCategoryRouter);
  app.use("/api/v1/brands", brandRouter);
  app.use("/api/v1/products", productRouter);
  app.use("/api/v1/users", userRouter);
  app.use("/api/v1/reviews", reviewRouter);
  app.use("/api/v1/auth", authRouter);
  app.use("/api/v1/wishlists", wishlistRouter);
  app.use("/api/v1/addresses", addressRouter);
  app.use("/api/v1/coupons", couponRouter);
};
module.exports = mountRoutes;
