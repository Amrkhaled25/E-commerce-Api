require("dotenv").config();

require("express-async-errors");
const express = require("express");
const app = express();

const cookieParser = require("cookie-parser");
const cors = require("cors");
const fileUpload = require("express-fileupload");
//DataBase
const connectDB = require("./db/connect");

// Routes
const authRoutes = require("./routes/authRoute");
const userRoutes = require("./routes/userRoute");
const productRoutes = require("./routes/productRoute");
// Middlewares
const notFound = require("./middleware/not-found");
const errorHandler = require("./middleware/error-handler");

app.use(cors());

app.use(express.json());
app.use(cookieParser(process.env.JWT_SECRET));

app.use(express.static("./public"));
app.use(fileUpload());

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/users", userRoutes);
app.use("/api/v1/products", productRoutes);
// if there is no route
app.use(notFound);
app.use(errorHandler);
const port = process.env.PORT || 3000;
const start = async () => {
  try {
    await connectDB(process.env.MONGO_URL);
    app.listen(port, console.log(`app is listening on port ${port}`));
  } catch (error) {
    console.log(error);
  }
};
start();
