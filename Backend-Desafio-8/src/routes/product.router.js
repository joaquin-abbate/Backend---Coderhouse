import { Router } from "express";
import ProductController from "../controllers/product.controllers.js";
import { isAdmin } from "../middlewares/isAdmin.js";
import * as mockController from "../mocking/mocking.controller.js";

const controller = new ProductController();

const router = Router();

router.get("/", controller.getAll);

router.get("/:id", controller.getById);

router.get("/dto/:id", controller.getProdById);

router.post("/", isAdmin, controller.create);

router.post("/dto", controller.createProd);

router.put("/:id", isAdmin, controller.update);

router.delete("/:id", isAdmin, controller.delete);

// !Mocking Desafio-8

router.post("/mockingproducts", mockController.createMocking);

router.get("/mockingproducts", mockController.getMocks);

export default router;
