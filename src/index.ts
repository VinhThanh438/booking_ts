import { PORT } from '@config/environment';
import express, { Request, Response } from 'express';

const app = express();

app.get('/', (req: Request, res: Response) => {
    console.log({ PORT });
    res.send('Hello, world!');
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
