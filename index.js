const express = require("express");
const bodyParser = require("body-parser");
const notesRoutes = require("./routes/notes");
require("dotenv").config();

const app = express();
const port = process.env.APP_PORT || 3000;

app.use(bodyParser.json());
app.use("/notes", notesRoutes);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
