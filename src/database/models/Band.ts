import { Schema, model } from "mongoose";

const BandSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
});

const Band = model("Band", BandSchema, "bands");

export default Band;
