import express from "express";
import mongoose from "mongoose";
import userRouter from "./routers/userRouters.js";
import productRouter from "./routers/productRouter.js";
import dotenv from "dotenv";
import orderRouter from "./routers/orderRouter.js";

dotenv.config();
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const port = process.env.port || 5000;

mongoose.connect(process.env.MONGODB_URL || "mongodb://localhost/amazona", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
});

//Middleware
app.use("/api/users", userRouter);
//if there is any error in the router which is rapped inside express-async-handler this middleware will be called
app.use((err, req, res, next) => {
  res.status(500).send({ message: err.message });
});
app.use("/api/products", productRouter);
app.use("/api/orders", orderRouter);
app.get("/api/config/paypal", (req, res) => {
  res.send(process.env.PAYPAL_CLIENT_ID || sb);
});

app.get("/", (req, res) => {
  res.send("Server is ready");
});

app.listen(5000, () => console.log(`http://localhost:${port}`));
