import { Router } from "express";
import { getItemDetails, searchItems } from "../controllers/itemController.js";

const itemsRouter = Router();

itemsRouter.get('/', searchItems);
itemsRouter.get('/:id', getItemDetails);

export default itemsRouter;


