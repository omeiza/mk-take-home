import express, { Request, Response } from "express";
import data from "../data";
const router = express.Router();

// Show data types
export type ShowTypes = {
	showID: number,
	items: { itemID: number, itemName: string, quantity_sold: number }[],
}

/**
 * POST /show/{show_ID}/buy_item/{item_ID}
 * Description: To buy a single item during a show
 */
router.post("/:show_ID/buy_item/:item_ID", async (req: Request, res: Response) => {
	try {
		const inventoryItem = data.inventory.find(item => item.itemID == parseInt(req.params.item_ID));
		const itemIndex = data.inventory.findIndex(item => item.itemID == parseInt(req.params.item_ID));

		if (inventoryItem && inventoryItem.quantity > 0) {
			const show = data.show.find(item => item.showID == parseInt(req.params.show_ID));
			const showIndex = data.show.findIndex(item => item.showID == parseInt(req.params.show_ID));

			// Check if show exist and update it, if not create it
			if (!show) {
				data.show.push({
					showID: parseInt(req.params.show_ID),
					items: [{
						itemID: inventoryItem.itemID,
						itemName: inventoryItem.itemName,
						quantity_sold: 1
					}]
				})
			} else {
				const showItemIndex = data.show[showIndex].items.findIndex(item => item.itemID == parseInt(req.params.item_ID));

				if (showItemIndex >= 0) {
					data.show[showIndex].items[showItemIndex].quantity_sold = data.show[showIndex].items[showItemIndex].quantity_sold + 1;
				} else {
					data.show[showIndex].items.push({
						itemID: data.inventory[itemIndex].itemID,
						itemName: data.inventory[itemIndex].itemName,
						quantity_sold: 1
					});
				}
			}

			data.inventory[itemIndex].quantity = data.inventory[itemIndex].quantity - 1;
		} else {
			return res.status(404).json({ status: "not found", message: "Item is out of stock." });
		}

		return res.status(200).json({ status: "success", message: `Item is currently being sold at show ${req.params.show_ID}` });
	} catch (err) {
		console.error(err);
	}
});

/**
 * GET /show/{show_ID}/buy_item/{item_ID}
 * Description: Return the name and quantity of item_id sold by show_ID
 */
router.get("/:show_ID/buy_item/:item_ID", (req: Request, res: Response) => {
	try {
		const item = data.inventory.find(item => item.itemID == parseInt(req.params.item_ID));
		const showIndex = data.show.findIndex(item => item.showID == parseInt(req.params.show_ID));

		if (!item) return res.status(404).json({ status: "not found", message: "Item is out of stock." });
		if (showIndex < 0) return res.status(404).json({ status: "not found", message: "Show not found." });

		return res.json(data.show[showIndex].items.find(item => item.itemID == parseInt(req.params.item_ID)));
	} catch (err) {
		console.error(err);
	}
});

/**
 * GET /show/{show_ID}/buy_item/
 * Description: Return the items being sold by a show show_ID
 */
router.get("/:show_ID/buy_item", (req: Request, res: Response) => {
	try {
		const showIndex = data.show.findIndex(item => item.showID == parseInt(req.params.show_ID));
		if (showIndex < 0) return res.status(404).json({ status: "not found", message: "Show not found." });

		res.json(data.show[showIndex].items);
	} catch (err) {
		console.error(err);
	}
});

export default router;