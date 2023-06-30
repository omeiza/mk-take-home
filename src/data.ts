import { InventoryTypes } from "./routes/inventory.route";
import { ShowTypes } from "./routes/show.route";

// Data types
export type DataTypes = {
	inventory: InventoryTypes[],
	show: ShowTypes[]
}

/**
 * Data object serving as the custodian of non-persistent data
 * Description: Data is only available for as long as the node application is running
 */
const data: DataTypes = {
	inventory: [],
	show: []
};

export default data;