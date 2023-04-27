import express from "express";
import ProductManager from "./manager/product.manager.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const productManager = new ProductManager("./products.json");

app.get("/products", async (req, res) => {
  try {
    const products = await productManager.getProducts();
    let limitValue = products.length;

    if (req.query.limit) {
      // Verifica si limit está presente en la solicitud
      limitValue = parseInt(req.query.limit);
    }

    const limitedProducts = products.slice(0, limitValue);
    res.status(200).json(limitedProducts);
  } catch (error) {
    res.status(404).json({ message: error.message });
    console.log(error);
  }
});

app.get("/products/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const product = await productManager.getProductById(Number(id));
    if (product) {
      res.status(200).json(product);
    } else {
      res.status(404).send(`No se encontró el producto con Id: ${id}`);
    }
  } catch (error) {}
});

app.post("/products", async (req, res) => {
  try {
    const product = req.body;
    const newProduct = await productManager.addProducts(product);
    res.status(200).json(newProduct);
    res.status(404).json({ message: error.message });
  } catch (error) {}
});

const PORT = 8080;

app.listen(PORT, () => {
  console.log(`Server en puerto: ${PORT}`);
});
