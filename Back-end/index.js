const connectToMongo = require("./db");
const express = require("express");
const authRoutes = require("./routes/auth");
const note = require("./routes/notes");
const errorHandler = require("./middleware/errorHandler");
require("dotenv").config();

connectToMongo();
const app = express();
const port = process.env.SERVER_PORT;

app.use(express.json());

// Availabel Routes
app.use("/api/auth", authRoutes);

app.use("/api/notes", note);

app.use(errorHandler);

app.listen(port, () => {
  console.log(`iNotebook backend listening on port http://localhost:${port}`);
});
