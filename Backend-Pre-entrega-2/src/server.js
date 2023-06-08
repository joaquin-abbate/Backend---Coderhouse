import "./db/database.js";
import express from "express";
import morgan from "morgan";
import { errorHandler } from "./middlewares/errorHandler.js";
import cartsRouter from "./routes/carts.router.js";
import productRouter from "./routes/products.router.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(errorHandler);
app.use(morgan("dev"));

app.use("/carts", cartsRouter);
app.use("/products", productRouter);

const PORT = 8080;

app.listen(PORT, () => console.log(`🚀 Server listening on port ${PORT}`));
