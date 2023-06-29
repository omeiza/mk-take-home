import express, { Request, Response } from "express";
const router = express.Router();

/**
 * Show data types
 */
export type ShowTypes = {
	showID: number,
	items: { itemID: number, itemName: string, quantity_sold: number }[],
}

/**
 * POST /show/{show_ID}/buy_item/{item_ID}
 * Description: To buy a single item during a show
 */
router.post("/:show_ID/buy_item/:item_ID", async (req: Request, res: Response): Promise<Response> => {

});

/**
 * GET /show/{show_ID}/buy_item/{item_ID}
 * Description: Return the name and quantity of item_id sold by show_ID
 */
router.get("/:show_ID/buy_item/:item_ID", async (req: Request, res: Response): Promise<Response> => {

});

export default router;