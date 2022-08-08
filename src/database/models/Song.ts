import { model, Schema } from "mongoose";

const SongSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  band: {
    type: Schema.Types.ObjectId,
    ref: "Band",
    required: true,
  },
});

const Song = model("Song", SongSchema, "songs");

export default Song;
