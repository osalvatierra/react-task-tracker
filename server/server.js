const express = require("express");
const expressLayouts = require('express-ejs-layouts');

const app = express();

// EJS
app.use(expressLayouts);
app.set('view engine', 'ejs')

const cors = require("cors");
app.use(cors());
const mongoose = require("mongoose");
require("dotenv").config({ path: "./config.env" });


app.use(express.json());

app.use("/", require("./routes/index"));
app.use("/users", require("./routes/users"));
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