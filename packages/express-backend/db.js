// db.js
import mongoose from "mongoose";

const MONGO_URI = "mongodb://127.0.0.1:27017/users";

mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("MongoDB connected"))
.catch(err => console.error("MongoDB connection error:", err));

export default mongoose;

