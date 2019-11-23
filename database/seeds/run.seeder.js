require("dotenv").config();
import mongoose from "mongoose";
import podSeeder from "./pods.seeder";
import machineSeeder from "./machines.seeder";

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

(async () => {
  await machineSeeder();
  await podSeeder();
  process.exit();
})();