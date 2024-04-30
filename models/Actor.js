import mongoose, { Schema } from "mongoose";

const actorSchema = new Schema({
  firstName: String,
  lastName: String,
  dob: Date,
  age: Number,
  movies: [{ type: Schema.Types.ObjectId, ref: "Movie" }],
  imageUrl: String,
});

const Actor = mongoose.models.Actor || mongoose.model("Actor", actorSchema);

export default Actor;
