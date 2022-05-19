const express = require("express");
const dotenv = require("dotenv");
const connectToMongo = require("./db");
const bodyParser = require("body-parser");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const loginRouter = require("./routes/login");
const profileRouter = require("./routes/profile");
const listRouter = require("./routes/list");

//connect to mongoDB and initialize express and dotenv
const app = express();
dotenv.config();
connectToMongo();

//middleware
app.use(bodyParser.json());
app.use(cors());
app.use(cookieParser());

//routes
app.use("/api/v1", loginRouter);
app.use("/api/v1", profileRouter);
app.use("/api/v1", listRouter);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(process.env.PORT || 3000, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
