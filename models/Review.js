import mongoose, { Schema } from "mongoose";

const reviewSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: "User" },
  rate: Number,
  comment: String,
  movie: { type: Schema.Types.ObjectId, ref: "Movie" },
});

const Review = mongoose.models.Review || mongoose.model("Review", reviewSchema);

export default Review;
