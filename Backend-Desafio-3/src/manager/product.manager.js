import fs from "fs";

export default class ProductManager {
  constructor(path) {
    this.path = path;
  }

  async #newId() {
    let newId = 0;
    const products = await this.getProducts();
    products.map((prod) => {
      if (prod.id > newId) newId = prod.id;
    });
    return newId;
  }

  async getProducts(limit) {
    try {
      if (fs.existsSync(this.path)) {
        const products = await fs.promises.readFile(this.path, "utf-8");
        const productJS = JSON.parse(products);
        const limitedProducts = productJS.slice(0, limit); // Limitamos la cantidad de productos utilizando el método slice
        return limitedProducts;
      } else {
        return [];
      }
    } catch (error) {
      console.log(error);
    }
  }

  async addProducts(obj) {
    try {
      const product = {
        id: (await this.#newId()) + 1,
        ...obj,
      };
      const productsFile = await this.getProducts();
      productsFile.push(product);
      await fs.promises.writeFile(this.path, JSON.stringify(productsFile));
      return product;
    } catch (error) {
      console.log(error);
    }
  }

  async getProductById(id) {
    const productsFile = await this.getProducts();
    const product = productsFile.find((product) => product.id === id);
    if (product) {
      console.log(`El producto con id: ${id} es:`);
      return product;
    } else {
      console.error(`No se encontró producto con id: ${id}.`);
    }
  }

  async deleteProduct(id) {
    try {
      const productFile = await this.getProducts();
      if (productFile.length > 0) {
        const newArray = productFile.filter((prod = prod.id !== id));
        await fs.promises.writeFile(this.path, JSON.stringify(newArray));
      }
    } catch (error) {
      console.log(error);
    }
  }

  async updateProduct(id, updatedProduct) {
    const products = await this.getProducts();
    const index = products.findIndex((product) => product.id === id);
    if (index !== -1) {
      const updatedProductWithId = {
        ...updatedProduct,
        id: products[index].id,
      };
      products[index] = updatedProductWithId;
      await fs.promises.writeFile(this.path, JSON.stringify(products), {
        flag: "w",
      });
      console.log(`Producto con ID ${id} actualizado correctamente.`);
    } else {
      console.error(`No se encontró producto con id: ${id}.`);
    }
  }
}
