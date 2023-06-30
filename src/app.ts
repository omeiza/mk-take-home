import express, { Express, Request, Response, NextFunction } from "express";
import * as openapi from "express-openapi-validator";
import bodyParser from "body-parser";
import inventoryRoute from "./routes/inventory.route";
import showRoute from "./routes/show.route";

// Response error definition
interface ResponseError extends Error {
	status?: number;
	errors?: { path: string, message: string, errorCode: string }[]
}

// Server
const app: Express = express();

// Parse incoming request body (req.body) in a middleware
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: false }));

// Validate req and res
app.use(
	openapi.middleware({
		apiSpec: './src/spec/openapi.yaml',
		validateRequests: true,
		validateResponses: true
	}),
);

// Error handling
app.use((error: ResponseError, req: Request, res:Response, next: NextFunction ) => {
	res.status(error.status || 500).json({
		status: error.status,
		errors: error.errors
	});
});

// Routes
app.use("/inventory", inventoryRoute);
app.use("/show", showRoute);

export default app;