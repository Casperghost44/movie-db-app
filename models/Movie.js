import mongoose, { Schema } from "mongoose";

const movieSchema = new Schema({
  title: String,
  genre: String,
  rating: Number,
  reviews: [{ type: Schema.Types.ObjectId, ref: "Review" }],
  dor: String,
  director: { type: Schema.Types.ObjectId, ref: "Director" },
  cast: [{ type: Schema.Types.ObjectId, ref: "Actor" }],
  length: Number,
  imageUrl: String,
});

const Movie = mongoose.models.Movie || mongoose.model("Movie", movieSchema);

export default Movie;
