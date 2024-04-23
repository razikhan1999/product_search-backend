const mongoose = require('mongoose');
const data = require("./data.json");

export const populateDatabase = async (): Promise<void> => {
    try {
      await mongoose.connection.collection('products').deleteMany({});
      await mongoose.connection.collection('products').insertMany(data);
      console.log("Initial products created successfully");
    } catch (error) {
      console.error("Error populating database with initial data:", error);
    }
  };