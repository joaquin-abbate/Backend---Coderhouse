import * as mockingService from "../mocking/mocking.service.js";

export const createMocking = async (req, res) => {
  const { cant } = req.query;
  try {
    const response = await mockingService.createProductsMock(cant);
    res.status(200).json({ products: response });
  } catch (error) {
    console.log(error);
  }
};

export const getMocks = async (req, res) => {
  try {
    const response = await mockingService.getProducts();
    res.status(200).json({ users: response });
  } catch (error) {
    console.log(error);
  }
};
