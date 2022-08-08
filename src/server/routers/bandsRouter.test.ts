import request from "supertest";
import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose from "mongoose";
import app from "../server";
import connectDB from "../../database";
import Band from "../../database/models/Band";

let mongoServer: MongoMemoryServer;
const mockBands = [
  { name: "La banda de la patata" },
  { name: "La banda de la berenjena" },
];

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  const uri = mongoServer.getUri();

  await connectDB(uri);
});

afterAll(async () => {
  await mongoose.connection.close();
  await mongoServer.stop();
});

beforeEach(async () => {
  await Band.create(mockBands[0]);
  await Band.create(mockBands[1]);
});

afterEach(async () => {
  await Band.deleteMany({});
});

describe("Given a GET /bands endpoint", () => {
  describe("When it receives a request", () => {
    test("Then it should send a response with 200 status and two bands", async () => {
      const { body } = await request(app).get("/bands/").expect(200);

      expect(body).toHaveProperty("bands");
      expect(body.bands).toHaveLength(2);
      expect(body.bands[0]).toHaveProperty("name", mockBands[0].name);
      expect(body.bands[1]).toHaveProperty("name", mockBands[1].name);
    });
  });
});
