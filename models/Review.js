import mongoose, { Schema } from "mongoose";

const reviewSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: "User" },
  rate: Number,
  comment: String,
});

const Review = mongoose.models.Review || mongoose.model("Review", reviewSchema);

export default Review;
