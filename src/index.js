import express from "express";
import dotenv from "dotenv";
import categoriesRoutes from './routes/categories.routes';
import customersRoutes from './routes/customers.routes';
import gamesRoutes from '.routes/games.routes';
import rentalsRoutes from './routes/rentals.routes';

dotenv.config();

const app = express();
app.use(express.json());
app.use(categoriesRoutes);
app.use(customersRoutes);
app.use(gamesRoutes);
app.use(rentalsRoutes);

app.listen(4000, () => console.log(`Server running in port: ${4000}`));
