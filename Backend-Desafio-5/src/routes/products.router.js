import { Router } from "express";
import {
  getAllProductsCtr,
  getProductByIdCtr,
  createProductCtr,
  addProductToCartCtr,
  deleteProductCtr,
  updateProductCtr,
  delProductCartController,
} from "../controllers/products.controller.js";

const router = Router();

router.get("/", getAllProductsCtr);
router.get("/:prodId", getProductByIdCtr);
router.post("/", createProductCtr);
router.post("/:cartId/add/:prodId", addProductToCartCtr);
router.delete("/:cartId/del/:prodId", delProductCartController);
router.delete("/:prodId", deleteProductCtr);
router.put("/:prodId", updateProductCtr);

export default router;
