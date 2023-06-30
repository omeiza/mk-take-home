/**
 * Application bootstrap/start-point
 * NOTE: This was an intentional abstraction to avoid calling listen before tests
 */

import app from "./app";
const port = process.env.PORT ?? '4090';

app.listen(port, () => {
	console.log(`MAKA live is currently running on port ${port}`);
});