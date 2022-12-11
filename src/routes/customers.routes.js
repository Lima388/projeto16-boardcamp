import { Router } from "express";
import {
  create,
  findAll,
  findOne,
  update,
} from "../controllers/customers.controller.js";

const router = Router();

router.post("/customers", create);
router.get("/customers/:id", findOne);
router.get("/customers", findAll);
router.put("/customers/:id", update);

export default router;
