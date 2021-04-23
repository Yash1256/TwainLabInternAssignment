const express = require("express");
const AppError = require("./utils/appError");
const globalErrorHandler = require("./Controller/errorController");
const userRoutes = require(`${__dirname}/routes/userRoutes`);
const partyRoutes = require(`${__dirname}/routes/partyRoutes`);
const workRoutes = require(`${__dirname}/routes/workRoutes`);
const app = express();

app.use(express.json({ limit: "10kb" }));

app.use("/v1/users/", userRoutes);
app.use("/v1/party/", partyRoutes);
app.use("/v1/work/", workRoutes);

app.all("*", (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this Server`, 404));
});

// Error Handling Middleware
app.use(globalErrorHandler);

module.exports = app;
