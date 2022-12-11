import { Router } from "express";
import { create, findAll } from "../controllers/games.controller.js";
import { gamesSchemaValidation } from "../middlewares/gamesSchemaValidation.middleware.js";

const router = Router();

router.post("/games", gamesSchemaValidation, create);
router.get("/games", findAll);

export default router;
