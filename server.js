const path = require("path");

const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });
require("./db/mongoose.js");

const rateLimit = require("express-rate-limit");
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const compression = require("compression");
const hpp = require("hpp");

const AppError = require("./utils/AppError.js");
const globalErrorHandler = require("./middlewares/errorMiddleware.js");
const { webhookCheckout } = require("./controllers/orderController.js");
const mountRoutes = require("./routers");
const app = express();
//Middlewares
app.use(cors());
app.use(compression());
app.options("*", cors());
// Checkout webhook
app.post(
  "/webhook-checkout",
  express.raw({ type: "application/json" }),
  webhookCheckout
);
// Set request size limit to 20kb
app.use(express.json({ limit: "20kb" }));

app.use(express.static(path.join(__dirname, "uploads")));

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  limit: 5, //   Limit each IP to 5 requests per `window` (here, per 15 minutes).
});

// Apply the rate limiting middleware to login route.
app.use("/api/v1/auth/login", limiter);

// Protect against HTTP Parameter Pollution attacks
app.use(
  hpp({
    whitelist: [
      "price",
      "ratingsAverage",
      "sold",
      "quantity",
      "ratingsQuantity",
    ],
  })
);

mountRoutes(app);
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
