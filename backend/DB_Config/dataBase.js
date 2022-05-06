const print = (args) => console.log(args);
//!-------------Requirement--------------//
const { log } = require("console");
const mongoose = require("mongoose");
const colors = require("colors");

const connect = async () => {
  try {
    const cnxDb = await mongoose.connect(process.env.MongoDB_URL, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    });
    print(`MongoDb Connected: ${cnxDb.connection.host}`.yellow.underline);
  } catch (error) {
    print(error.red.underline.bold);
  }
};
module.exports = connect;
