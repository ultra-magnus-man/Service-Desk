const express = require("express");
const dotenv = require("dotenv").config();
const { errorHandler } = require("./middleware/errorMiddleware");
const PORT = process.env.PORT || 5000;
const connectDB = require("./config/db");
const path = require("path");
//connect to database
connectDB();
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/", (req, res) => {
  res.status(200).json({ message: "Welcome to Support Desk API" });
});

//Routes
//We hve mentioned the path here that is why we don't need to mention the path in userRoutes
app.use("/api/users", require("./routes/userRoutes"));
app.use("/api/tickets", require("./routes/ticketRoutes"));

//Serve Frontend
if (process.env.NODE_ENV === "production") {
  //Set build folder as static
  app.use(express.static(path.join(__dirname, "../frontend/build")));

  app.get("*", (req, res) =>
    res.sendFile(__dirname, "../", "frontend", "build", "index.html")
  );
} else {
  app.get("/", (req, res) => {
    res.status(200).json({ message: "Welcome to Support Desk API" });
  });
}
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server started on PORT ${PORT}`);
});
