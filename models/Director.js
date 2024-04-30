import mongoose, { Schema } from "mongoose";

const directorSchema = new Schema({
  firstName: String,
  lastName: String,
  movies: [{ type: Schema.Types.ObjectId, ref: "Movie" }],
  dob: Number,
  age: Number,
});

const Director =
  mongoose.models.Director || mongoose.model("Director", directorSchema);

export default Director;
