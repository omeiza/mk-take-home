import express, { Express } from "express";
import inventoryRoute from "./routes/inventory.route";
import showRoute from "./routes/show.route";

// Server
const app: Express = express();
const port = 6190;

// Routes
app.use("/inventory", inventoryRoute);
app.use("/show", showRoute);

// App init
app.listen(port, () => {
	console.log(`MAKA live is currently running on port ${port}`);
});

// For the purpose of unit testing
export default app;