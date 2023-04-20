const fs = require("fs");

class ProductManager {
  constructor() {
    this.path = "./productos.JSON";
    this.lastId = 0;
  }

  async getProducts() {
    try {
      if (fs.existsSync(this.path)) {
        const products = await fs.promises.readFile(this.path, "utf-8");
        const productJS = JSON.parse(products);
        return productJS;
      } else {
        return [];
      }
    } catch (error) {
      console.log(error);
    }
  }

  async addProducts(products) {
    try {
      const newProducts = products.map((product) => ({
        ...product,
        id: this.#newId(),
      }));
      await fs.promises.writeFile(this.path, JSON.stringify(newProducts), {
        flag: "w",
      });
      return newProducts;
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
    const products = await this.getProducts();
    const index = products.findIndex((product) => product.id === id);
    if (index !== -1) {
      products.splice(index, 1);
      await fs.promises.writeFile(this.path, JSON.stringify(products), {
        flag: "w",
      });
      console.log(`Producto con ID ${id} eliminado correctamente.`);
    } else {
      console.error(`No se encontró producto con id: ${id}.`);
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

  #newId() {
    this.lastId++;
    return this.lastId;
  }
}

const productManager = new ProductManager();

const producto1 = {
  productName: "Nike Blancas",
  description: "Zapatillas deportivas",
  price: 20000,
  imgURL: "abc123",
  // "https://images.unsplash.com/photo-1600185365926-3a2ce3cdb9eb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1925&q=80",
  stock: 2,
};

const producto2 = {
  productName: "Nike verdes",
  description: "Zapatillas deportivas",
  price: 20000,
  imgURL: "abc123",
  // "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=464&q=80",
  stock: 15,
};

const producto3 = {
  productName: "Nike rojas",
  description: "Zapatillas deportivas",
  price: 20000,
  imgURL: "abc123",
  // "https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80",
  stock: 20,
};

const updatedProduct = {
  productName: "Nike amarillas",
  description: "Zapatillas deportivas",
  price: 25000,
  imgURL: "def456",
  stock: 10,
};

const test = async () => {
  const get = await productManager.getProducts();
  // console.log("Productos", get);
  await productManager.addProducts([producto1, producto2, producto3]);

  console.log("--------------------------------------");
  console.log(await productManager.getProductById(1)); //Producto con Id 1
  console.log("--------------------------------------");

  console.log("                                      "); //?Espacio para que se vea mas clara la terminal

  console.log("--------------------------------------");
  console.log(await productManager.getProductById(10)); //Not found - Undefined
  console.log("--------------------------------------");

  console.log("                                      "); //?Espacio para que se vea mas clara la terminal

  console.log("--------------------------------------");
  await productManager.deleteProduct(3);
  console.log("--------------------------------------");

  console.log("                                      "); //?Espacio para que se vea mas clara la terminal

  console.log("--------------------------------------");
  await productManager.updateProduct(1, updatedProduct);
  console.log("--------------------------------------");

  console.log("                                      "); //?Espacio para que se vea mas clara la terminal

  console.log("--------------------------------------");
  console.log(await productManager.getProductById(1)); // Muestra el producto actualizado
  console.log("--------------------------------------");
};

test();
