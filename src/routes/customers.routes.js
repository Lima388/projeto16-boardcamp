import { Router } from "express";
import {
  create,
  findAll,
  findOne,
  update,
} from "../controllers/customers.controller.js";
import { customersSchemaValidation } from "../middlewares/customersSchemaValidation.middleware.js";

const router = Router();

router.post("/customers", customersSchemaValidation, create);
router.get("/customers/:id", findOne);
router.get("/customers", findAll);
router.put("/customers/:id", customersSchemaValidation, update);

export default router;
