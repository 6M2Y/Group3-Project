import express, { Request, Response } from 'express';
import dotenv from 'dotenv';



const app = express();
app.use(express.json());

app.get('/', (req: Request, res: Response) => {
    res.send('API is running')
});

export default app;
