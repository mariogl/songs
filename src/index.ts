import "./loadEnvironment";
import portfinder from "portfinder";
import initializeServer from "./server";
import connectDB from "./database";

const port = +process.env.PORT ?? 4000;
const mongoString = process.env.MONGO_CONNECTION;

(async () => {
  try {
    await connectDB(mongoString);
    await initializeServer(port);
  } catch (error) {
    const freePort = await portfinder.getPortPromise();
    await initializeServer(freePort);
  }
})();
