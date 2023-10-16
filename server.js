const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });
require("./db/mongoose.js");
const morgan = require("morgan");
const categoryRouter = require("./routers/categoryRouter.js");
const Category = require("./models/category.js");
const { getCategory } = require("./controllers/categoryController.js");
const AppError = require("./utils/AppError.js");
const globalErrorHandler = require("./middlewares/errorMiddleware.js");
const express = require("express");
const app = express();

//Middlewares
app.use(express.json());
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}
app.use("/api/v1/categories", categoryRouter);
//Catching Unhandled Routes
app.all("*", (req, res, next) => {
  next(new AppError(`cannot find ${req.originalUrl} on the server`, 404));
});
//Use Global Error Handling Middleware
app.use(globalErrorHandler);
//........................
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
