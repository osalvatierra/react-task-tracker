const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config({ path: "./config.env" });

app.use(cors());
app.use(express.json());

app.use("/", require("./routes/record"));
// get driver connection
const dbo = require("./db/conn");
const port = process.env.PORT || 5001; 

//Connect to MongoDB alternative method

app.listen(port, () => {
  // perform a database connection when server starts
  dbo.connectToServer(function (err) {
    if (err) console.error(err);
 
  });
  console.log(`Server is running on port: ${port}`);
});