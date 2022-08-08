import "../loadEnvironment";
import Debug from "debug";
import mongoose from "mongoose";
import chalk from "chalk";

const debug = Debug("songs:db:index");

const connectDB = async (mongoUri: string) => {
  try {
    mongoose.set("debug", true);
    mongoose.set("toJSON", {
      virtuals: true,
      transform: (doc, ret) => {
        // eslint-disable-next-line no-underscore-dangle, no-param-reassign
        delete ret._id;
        // eslint-disable-next-line no-underscore-dangle, no-param-reassign
        delete ret.__v;
      },
    });
    await mongoose.connect(mongoUri);
    debug(chalk.yellow(`💾 Connected to Database`));

    return true;
  } catch (error) {
    debug(chalk.red(`💥 Error connecting to Database`));
    throw error;
  }
};

export default connectDB;
