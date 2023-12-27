import mongoose from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.DATABASE!);
  } catch (error) {
    console.log("[Server]: MongoDB Connection Error ", error);
  }

  const connection = mongoose.connection;

  if (connection.readyState >= 1) {
    console.log("[Server]: MongoDB Connected");
    return;
  }
  connection.on("error", (error) => {
    console.log("[Server]: MongoDB Connection Error ", error);
  });
};

export default connectDB;
