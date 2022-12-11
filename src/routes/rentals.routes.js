import { Router } from "express";
import {
  create,
  find,
  update,
  erase,
} from "../controllers/rentals.controller.js";

const router = Router();

router.get("/rentals", find);
router.post("/rentals", create);
router.post("/rentals/:id/return", update);
router.delete("/rentals/:id", erase);

export default router;
