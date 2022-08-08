import "./loadEnvironment";
import Debug from "debug";
import portfinder from "portfinder";
import initializeServer from "./server";
import connectDB from "./database";

const debug = Debug("songs:index");

const port = +process.env.PORT ?? 4000;
const mongoString = process.env.MONGO_CONNECTION as string;

(async () => {
  try {
    await connectDB(mongoString);
    await initializeServer(port);
  } catch (error) {
    const freePort = await portfinder.getPortPromise();
    await initializeServer(freePort);
  }
})();
