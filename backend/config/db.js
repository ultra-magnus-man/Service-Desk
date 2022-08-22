const mongooose = require("mongoose");
const colors = require("colors");

const connectDB = async () => {
  try {
    const conn = await mongooose.connect(process.env.MONGO_URI);
    console.log(`Mongoose Connected: ${conn.connection.host}`.cyan.underline);
  } catch (error) {
    console.log(`Error: ${error.message}`.red.underline.bold);
    process.exit(1);
  }
};

module.exports = connectDB;
