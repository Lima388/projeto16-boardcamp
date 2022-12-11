import { Router } from "express";
import {create, findAll} from '../controllers/categories.controller.js'

const router = Router();

router.post("/categories", create)
router.get("/categories", findAll);

export default router;