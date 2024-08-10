import express, { Application, Request, Response } from "express";
const app: Application = express();
import cors from "cors";

// Parsers
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req: Request, res: Response) => {
	const a = 11;
	res.send(a);
});

export default app;
