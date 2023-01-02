// connet to db
const config = require("config");
const mongoose = require("mongoose");

console.log(config.get("db"));

mongoose.connect(config.get("db"));

// get app
const app = require("./src");

app.listen(process.env.PORT || 3000, () => {
  console.log("Server is running...");
});
