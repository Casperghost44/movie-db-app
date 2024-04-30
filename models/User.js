import mongoose, { Schema } from "mongoose";

const userSchema = new Schema({
  email: {type: String, required: [true, "Please provide email"], unique: true},
  password: {type: String, required: [true, "Please provide password"], unique: true},
  userType: {
    type: String,
    enum: ["user", "admin"],
    default: "user",
  },
  reviews: [{ type: Schema.Types.ObjectId, ref: "Review" }],
});

const User = mongoose.models.User || mongoose.model("User", userSchema);

export default User;
