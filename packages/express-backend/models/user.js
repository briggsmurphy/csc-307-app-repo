// models/user.js
import mongoose from "../db.js";

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  job: { type: String, required: true },
});

const User = mongoose.model("User", userSchema);

export default User;

