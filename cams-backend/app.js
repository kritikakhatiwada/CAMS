var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var cors = require("cors");
var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
const { ConnectToDatabase } = require("./models/index.model");
const validateToken = require("./middlewares/auth-middleware");
require("dotenv").config();
var app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use(
  cors({
    origin: [
      "http://localhost:4200",
      "http://localhost:3200",
      "http://localhost:2200",
      "https://camsadmin.codebyte.tech",
      "https://college.codebyte.tech",
      "https://student.codebyte.tech"
    ],
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    allowedHeaders: "Content-Type,Authorization",
    credentials: true,
  })
);
// Database Connection
ConnectToDatabase()
  .then(() => {
    console.log("Connected to database.");
  })
  .catch((e) => console.log(`Error connecting to database: ${e}`));

app.use(validateToken)
app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/college", require("./routes/college.route"));
app.use("/courses", require("./routes/courses.route"));
app.use("/applications", require("./routes/application.route"));
app.use("/students", require("./routes/student.route.js"));
app.use("/ratings", require("./routes/ratings.route.js"));
app.use("/favorites", require("./routes/favorites.route.js"));
app.use("/recommendation", require("./routes/recommendation.route.js"));
app.use("/dashboard", require("./routes/dashboard.route.js"));
app.use("/payments", require("./routes/payment.route.js"));
module.exports = app;
