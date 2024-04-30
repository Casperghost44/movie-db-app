import mongoose, { Schema } from "mongoose";

const userSchema = new Schema({
  firstName: String,
  lastName: String,
  dob: Number,
  age: Number,
  email: String,
  password: String,
  userType: {
    type: String,
    enum: ["user", "admin"],
    default: "user",
  },
  reviews: [{ type: Schema.Types.ObjectId, ref: "Review" }],
});

const User = mongoose.models.User || mongoose.model("User", userSchema);

export default User;
