import { Router } from "express";
import { create, findAll } from "../controllers/categories.controller.js";
import { categoriesSchemaValidation } from "../middlewares/categoriesSchemaValidation.middleware.js";

const router = Router();

router.post("/categories", categoriesSchemaValidation, create);
router.get("/categories", findAll);

export default router;
