const path = require("path");

const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });
require("./db/mongoose.js");

const express = require("express");
const morgan = require("morgan");

const AppError = require("./utils/AppError.js");
const globalErrorHandler = require("./middlewares/errorMiddleware.js");
//routers
const categoryRouter = require("./routers/categoryRouter.js");
const subCategoryRouter = require("./routers/subCategoryRouter.js");
const brandRouter = require("./routers/brandRouter.js");
const productRouter = require("./routers/productRouter.js");
const userRouter = require("./routers/userRouter.js");
const authRouter = require("./routers/authRouter.js");
const reviewRouter = require("./routers/reviewRouter.js");
//.............
const app = express();

//Middlewares
app.use(express.json());
app.use(express.static(path.join(__dirname, "uploads")));

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}
// Mount Routes
app.use("/api/v1/categories", categoryRouter);
app.use("/api/v1/subCategories", subCategoryRouter);
app.use("/api/v1/brands", brandRouter);
app.use("/api/v1/products", productRouter);
app.use("/api/v1/users", userRouter);
app.use("/api/v1/reviews", reviewRouter);
app.use("/api/v1/auth", authRouter);
//Catching Unhandled Routes
app.all("*", (req, res, next) => {
  next(new AppError(`cannot find ${req.originalUrl} on the server`, 404));
});
//Use Global Error Handling Middleware inside express
app.use(globalErrorHandler);
//........................
const port = process.env.PORT || 3000;
const server = app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

//Handling rejections that express does not handle
process.on("unhandledRejection", (error) => {
  console.error(`unhandledRejection Errors: ${error.name} | ${error.message}`);
  server.close(() => {
    console.error("Shutting down....");
    process.exit(1);
  });
});
