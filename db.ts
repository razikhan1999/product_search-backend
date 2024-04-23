const mongoose = require("mongoose");
import { populateDatabase } from "./src/seeder/seed";

const database = async (): Promise<void> => {
  try {
    await mongoose.connect(process.env.DB_URL);
    console.log("Database connected successfully");
    await populateDatabase();
  } catch (error) {
    console.error(error);
    console.log("Database connection failed");
  }
};

export { database };
