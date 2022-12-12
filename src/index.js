import express from "express";
import dotenv from "dotenv";
import categoriesRoutes from "./routes/categories.routes.js";
import customersRoutes from "./routes/customers.routes.js";
import gamesRoutes from "./routes/games.routes.js";
import rentalsRoutes from "./routes/rentals.routes.js";
import cors from "cors";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
app.use(categoriesRoutes);
app.use(customersRoutes);
app.use(gamesRoutes);
app.use(rentalsRoutes);

app.listen(4000, () => console.log(`Server running in port: ${4000}`));
