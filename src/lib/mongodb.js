import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI;

export default async function connectDB() {
  // Check if there is an existing connection to avoid duplicates
  if (mongoose.connection.readyState >= 1) return;

  try {
    // Establish connection to MongoDB using URI from environment variables
    await mongoose.connect(MONGODB_URI);
    console.log("Connected");
  } catch (error) {
    console.error("Connection error:", error);
  }
}