import express, { Request, Response } from "express";
const router = express.Router();

/**
 * Inventory data types
 */
export type InventoryTypes = {
	itemID: number,
	itemName: string,
	quantity: number
}

/**
 * POST /inventory
 * Description: To add or update item inventory right now
 */
router.post("/", async (req: Request, res: Response): Promise<Response> => {

});

export default router;
