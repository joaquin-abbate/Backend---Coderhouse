import { faker } from "@faker-js/faker";

export const generateMocksProducts = () => {
  return {
    name: faker.commerce.productName,
    description: faker.commerce.productDescription,
    price: faker.commerce.price({ min: 100, max: 200, dec: 0, symbol: "$" }),
    stock: faker.number.int({ max: 100 }),
  };
};
