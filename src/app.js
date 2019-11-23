require("dotenv").config();
import "./init/db";
import express from "express";
import "express-async-errors";
import routes from "./init/routes";
import createError from "http-errors";
import middleware from "./init/middleware";

const app = express();

// Load middlewares
middleware(app);

// Load Routes
routes(app);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// error handler
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.send({ error: "Something went wrong.." });
});

export default app;
