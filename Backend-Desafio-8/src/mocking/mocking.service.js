import { ProductModel } from "../persistence/daos/mongodb/models/products.model.js";
import { generateMocksProducts } from "../utils/mocks.utils.js";

export const createProductsMock = async (cant = 50) => {
  const mocksProductsArray = [];
  for (let i = 0; i < cant; i++) {
    const products = generateMocksProducts();
    mocksProductsArray.push(products);
  }
  const products = await ProductModel.create(mocksProductsArray);
  return products;
};

export const getProducts = async () => {
  try {
    const products = await ProductModel.find({});
    return products;
  } catch (error) {
    console.log(error);
  }
};
