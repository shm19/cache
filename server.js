// connet to db
// get app
const app = require("./src");

app.listen(process.env.PORT || 3000, () => {
  console.log("Server is running...");
});
