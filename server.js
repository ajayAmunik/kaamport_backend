const express = require("express");
const mongoose = require("mongoose");
const app = express();
const port =  5000;


// import router files
const userRouter = require("./router/user")
const category = require("./router/categoryRoute")
const servicesRouter = require("./router/servicesRoute");
const labour = require("./router/labourRoute");
const bookings = require("./router/bookingRoute");


app.use(express.json());



app.use(userRouter)
app.use(category)
app.use(servicesRouter);
app.use(labour);
app.use(bookings);




mongoose
  .connect("mongodb+srv://ajayamunik:Nfed6RWJWGDd2fMN@cluster0.51duirc.mongodb.net/Kamport", {})
  .then(() => {
    console.log("Connected to MongoDB");
    app.listen(port, () => {
      console.log(`Server running on http://localhost:${port}`);
    });
  })
  .catch((err) => {
    console.error("Failed to connect to MongoDB", err);
  });
