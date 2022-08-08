import "../loadEnvironment";
import Debug from "debug";
import mongoose from "mongoose";
import chalk from "chalk";

const debug = Debug("songs:db:index");

const connectDB = async (mongoUri: string) =>
  new Promise(async (resolve, reject) => {
    try {
      mongoose.set("debug", true);
      mongoose.set("toJSON", {
        virtuals: true,
        transform: (doc, ret) => {
          delete ret._id;
          delete ret.__v;
        },
      });
      await mongoose.connect(mongoUri);
      debug(chalk.yellow(`💾 Connected to Database`));

      resolve(true);
    } catch (error) {
      debug(chalk.red(`💥 Error connecting to Database`));
      reject(error);
    }
  });

export default connectDB;
