//!Revisar las rutas antes de ejecutar, ya que al subirlo al Github, a mi se me movió de carpeta

class ProductManager {
  constructor() {
    this.products = [];
    this.lastId = 0; // Variable privada para llevar la cuenta del último ID generado
  }

  getProducts() {
    return this.products;
  }

  addProducts(productName, description, price, imgURL, stock = 25) {
    const product = {
      id: this.#newId(), // Usa el último ID generado automáticamente
      productName,
      description,
      price,
      imgURL,
      stock,
    };
    this.products.push(product);
  }

  getProductById(id) {
    const product = this.products.find((product) => product.id === id);
    if (product) {
      return product;
    } else {
      console.error("Not found");
    }
  }

  #newId() {
    this.lastId++; // Incrementa el último ID generado
    return this.lastId;
  }
}

const productManager = new ProductManager();

productManager.addProducts(
  "Nike Blancas",
  "Zapatillas deportivas",
  20000,
  "https://images.unsplash.com/photo-1600185365926-3a2ce3cdb9eb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1925&q=80"
);

productManager.addProducts(
  "Nike verdes",
  "Zapatillas deportivas",
  20000,
  "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=464&q=80"
);

productManager.addProducts(
  "Nike rojas",
  "Zapatillas deportivas",
  20000,
  "https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80"
);

console.log(productManager.getProducts());

console.log(productManager.getProductById(10)); //Not found - Undefined
console.log(productManager.getProductById(1)); //Producto con Id 1
