import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    await mongoose.connect('mongodb+srv://heartzsilent8:heartz@cluster0.ahzab.mongodb.net/new',);
    console.log("DB connected");
  } catch (error) {
    console.error("Error connecting to DB:", error);
  }
};