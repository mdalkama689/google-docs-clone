import mongoose from "mongoose";

const connectToDB = async () => {
  try {
    const MONGO_URI = process.env.MONGO_URI;
    await mongoose.connect(MONGO_URI);
    console.log("Connected to MongoDB successfully");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error.message);
    process.exit(1);
  }
};

export default connectToDB;
