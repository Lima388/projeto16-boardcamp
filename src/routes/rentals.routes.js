import { Router } from "express";
import {
  create,
  find,
  update,
  erase,
} from "../controllers/rentals.controller.js";
import { rentalsSchemaValidation } from "../middlewares/rentalsSchemaValidation.middleware.js";

const router = Router();

router.get("/rentals", find);
router.post("/rentals", rentalsSchemaValidation, create);
router.post("/rentals/:id/return", update);
router.delete("/rentals/:id", erase);

export default router;
