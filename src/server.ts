import "dotenv/config";
import app from "./app";
import { startDatabase } from "./database";

const PORT: number = Number(process.env.PORT) || 3000;
const runningMsg: string = `Server is running on port ${PORT}`;

app.listen(PORT, async (): Promise<void> => {
    await startDatabase();
    console.log(runningMsg);
});