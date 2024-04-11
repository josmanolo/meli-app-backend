import express from "express";
import { errorHandler } from "./middleware/errorHandler.js";
import itemsRouter from "./routes/itemsRoutes.js";

const app = express();

app.use(express.json());
app.use('/api/items', itemsRouter);

app.use(errorHandler);

export default app;