const express = require("express");
const mongoose = require("mongoose");
const app = express();
const port =  5000;


// import router files
const userRouter = require("./router/user")


app.use(express.json());



app.use(userRouter)




mongoose
  .connect("mongodb://localhost:27017/kaamport", {})
  .then(() => {
    console.log("Connected to MongoDB");
    app.listen(port, () => {
      console.log(`Server running on http://localhost:${port}`);
    });
  })
  .catch((err) => {
    console.error("Failed to connect to MongoDB", err);
  });
