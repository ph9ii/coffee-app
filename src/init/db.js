require("dotenv").config();
import mongoose from "mongoose";

const MONGOURI =
  process.env.NODE_ENV == "test" || process.env.NODE_ENV == "staging"
    ? process.env.MONGO_URI_TEST
    : process.env.MONGO_URI;

// mongoose setup
mongoose.Promise = global.Promise;
mongoose
  .connect(MONGOURI, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log("Connected to mongo database!");
  })
  .catch(() => {
    console.error("Connection to mongo database failed!");
  });
