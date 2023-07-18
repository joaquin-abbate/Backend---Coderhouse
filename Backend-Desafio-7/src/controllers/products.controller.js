import {
  getAllProductsService,
  getProductByIdService,
  addProductToCartService,
  updateProductService,
  deleteProductService,
  createProductService,
  deleteProductCartService,
} from "../services/products.services.js";

export const getAllProductsCtr = async (req, res, next) => {
  try {
    const { page, limit } = req.query;
    const response = await getAllProductsService(page, limit);
    // res.json(response);
    const next = response.hasNextPage
      ? `http://localhost:8080/users?page=${response.nextPage}`
      : null;
    const prev = response.hasPrevPage
      ? `http://localhost:8080/users?page=${response.prevPage}`
      : null;
    res.json({
      results: response.docs,
      info: {
        count: response.totalDocs,
        pages: response.totalPages,
        next,
        prev,
      },
    });
  } catch (error) {
    next(error);
  }

  // try {
  //   const items = await getAllProductsService();
  //   res.json(items);
  // } catch (error) {
  //   next(error);
  // }
};

export const addProductToCartCtr = async (req, res, next) => {
  try {
    const { cartId } = req.params;
    const { prodId } = req.params;
    const newProduct = await addProductToCartService(cartId, prodId);
    res.json(newProduct);
  } catch (error) {
    next(error);
  }
};

export const getProductByIdCtr = async (req, res, next) => {
  try {
    const { prodId } = req.params;
    const prod = await getProductByIdService(prodId);
    if (!prod) throw new Error("Product not found");
    else res.json(prod);
  } catch (error) {
    next(error);
  }
};

export const createProductCtr = async (req, res, next) => {
  try {
    const prod = { ...req.body };
    const newProduct = await createProductService(prod);
    if (!newProduct) throw new Error("Validation error");
    else res.json(newProduct);
  } catch (error) {
    next(error);
  }
};

export const updateProductCtr = async (req, res, next) => {
  try {
    const { prodId } = req.params;
    const { name, description, price, stock } = req.body;
    await getProductByIdService(prodId);
    const docUpd = await updateProductService(prodId, {
      name,
      description,
      price,
      stock,
    });
    res.json(docUpd);
  } catch (error) {
    next(error);
  }
};
export const deleteProductCtr = async (req, res, next) => {
  try {
    const { prodId } = req.params;
    await deleteProductService(prodId);
    res.json({ message: "Product deleted successfully!" });
  } catch (error) {
    next(error);
  }
};

export const delProductCartController = async (req, res, next) => {
  try {
    const { cartId, prodId } = req.params;
    const product = await deleteProductCartService(cartId, prodId);
    if (product) {
      res.status(201).send({
        status: "success",
        mensaje: "Product successfully deleted to cart!",
        payload: product,
      });
    } else {
      res.status(404).send({
        status: "error",
        mensaje:
          "The product or cart you are searching for could not be found!",
      });
    }
  } catch (error) {
    next(error);
  }
};
