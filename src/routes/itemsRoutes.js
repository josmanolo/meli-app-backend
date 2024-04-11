import { Router } from "express";
import { searchItems } from "../controllers/itemController.js";

const itemsRouter = Router();

itemsRouter.get('/', searchItems);

export default itemsRouter;


