const mongoose = require("mongoose");
const conn = async () => {
  try {
    await mongoose
      .connect(
        "mongodb+srv://vishaltanwar:vishal2402@users-tasks.gjizb.mongodb.net/?retryWrites=true&w=majority&appName=Users-Tasks"
      )
      .then(() => {
        console.log("database is connected");
      });
  } catch (error) {
    console.error("Not Connected", error);
  }
};
conn();
