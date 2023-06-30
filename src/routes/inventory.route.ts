import express, { Request, Response } from "express";
import data from "../data";
const router = express.Router();

// Inventory data types
export type InventoryTypes = {
	itemID: number,
	itemName: string,
	quantity: number
}

/**
 * POST /inventory
 * Description: To add or update item inventory right now
 */
router.post("/", (req: Request, res: Response) => {
	try {
		const inventory: InventoryTypes[] = req.body;
		for (let index = 0; index < inventory.length; index++) {
			const matchedIndex = data.inventory.findIndex(item => item.itemID == inventory[index].itemID);
			if (matchedIndex >= 0) {
				data.inventory[matchedIndex].itemName = inventory[index].itemName;
				data.inventory[matchedIndex].quantity = inventory[index].quantity;
			} else {
				data.inventory.push(inventory[index]);
			}
		}

		res.json({ status: 'success' });
	} catch (err) {
		console.error(err);
	}
});

export default router;
