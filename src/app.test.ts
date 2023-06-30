import request from "supertest";
import { describe, test, expect } from "@jest/globals";
import data from "./data";
import app from "./app";

describe("Testing MAKA live endpoints", () => {
	test("adds items to stock", async () => {
		const response = await request(app)
			.post('/inventory')
			.send (
				[
					{
						"itemID": 12345,
						"itemName": "Fancy Dress",
						"quantity": 10
					},
					{
						"itemID": 12346,
						"itemName": "Blue Crop Top",
						"quantity": 10
					},
					{
						"itemID": 12347,
						"itemName": "Ripped Jean",
						"quantity": 10
					}
				]
			);

		await expect(response.status).toBe(200);
		expect(response.body.status).toBe('success');
	});

	test("updates items in stock", async () => {
		const response = await request(app)
			.post('/inventory')
			.send (
				[
					{
						"itemID": 12346,
						"itemName": "Light Blue Crop Top",
						"quantity": 10
					}
				]
			);

		expect(response.status).toBe(200);
		expect(response.body.status).toBe('success');
	});

	test("buys a single item during a show", async () => {
		const response = await request(app)
			.post('/show/123/buy_item/12345');

		expect(response.status).toBe(200);
		expect(response.body.status).toBe('success');
		expect(response.body.message).toBe('Item is currently being sold at show 123');
	});

	test("buys another single item during a show", async () => {
		const response = await request(app)
			.post('/show/123/buy_item/12347');

		expect(response.status).toBe(200);
		expect(response.body.status).toBe('success');
		expect(response.body.message).toBe('Item is currently being sold at show 123');
	});

	test("tries to buy a an item that is not available or in stock", async () => {
		const response = await request(app)
			.post('/show/123/buy_item/12349');

		expect(response.status).toBe(404);
		expect(response.body.status).toBe('not found');
		expect(response.body.message).toBe('Item is out of stock.');
	});

	test("gets a particular item sold by a show", async () => {
		const response = await request(app)
			.get('/show/123/buy_item/12345');

		expect(response.status).toBe(200);
		expect(response.body).toStrictEqual({
			"itemID": 12345,
			"itemName": "Fancy Dress",
			"quantity_sold": 1
		});
	});

	test("gets items sold buy a show", async () => {
		const response = await request(app)
			.get('/show/123/buy_item');

		expect(response.status).toBe(200);
		expect(response.body).toStrictEqual([
			{
				"itemID": 12345,
				"itemName": "Fancy Dress",
				"quantity_sold": 1
			},
			{
				"itemID": 12347,
				"itemName": "Ripped Jean",
				"quantity_sold": 1
			}
		]);
	});

	test("gets remaining item in stock", () => {
		expect(data.inventory).toStrictEqual([
			{
				"itemID": 12345,
				"itemName": "Fancy Dress",
				"quantity": 9
			},
			{
				"itemID": 12346,
				"itemName": "Light Blue Crop Top",
				"quantity": 10
			},
			{
				"itemID": 12347,
				"itemName": "Ripped Jean",
				"quantity": 9
			}
		]);
	});
});