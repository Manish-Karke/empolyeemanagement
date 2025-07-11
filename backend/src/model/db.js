const mongoose = require("mongoose");


(async () => {
  try {
    await mongoose.connect(process.env.MONGO_DB);
    console.log("mongoose is connected");
  } catch (err) {
    console.error("error on connecting to mongoDb", err);
  }
})();
