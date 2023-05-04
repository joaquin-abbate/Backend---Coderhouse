import express from "express";
import morgan from "morgan";
import { errorHandler } from "./middleware/errorHandler.js";
import { __dirname } from "./path.js";
import productsRouter from "./routes/product.router.js";
import cartsRouter from "./routes/cart.router.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));
app.use(errorHandler);

app.use("/api/products", productsRouter);
app.use("/api/carts", cartsRouter);

app.listen(8080, () => {
  console.log("🚀 Server listening on port 8080");
});
