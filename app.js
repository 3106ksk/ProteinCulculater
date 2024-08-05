const express = require("express");
const path = require("path");
const app = express();
const port = 3000;

// View setup
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use("/", require("./routes/index"));

// Static files
app.use(express.static(path.join(__dirname, "public")));

// Routes
app.use("/api", require("./routes/categories"));
app.use("/api", require("./routes/foods"));

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});
