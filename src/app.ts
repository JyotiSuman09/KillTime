import express, { NextFunction, Request, Response } from 'express';
import dotenv from 'dotenv';
import indexRoute from './routes';

dotenv.config();

const qrcode = require('qrcode-terminal');

// Initiate express
const app = express();

app.use(express.json());
app.use(indexRoute);

/* Error Handler */
app.use((error: any, _req: Request, res: Response, _next: NextFunction) => {
    res.status(501).json({
      status: false,
      message: "An error occurred",
      error,
    })
  })

// Setup "Hello World" endpoint
const port = process.env.PORT || 3000;

const LocalURL = `http://${process.env.LOCAL_URL}:${port}`;

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
    console.log(`URL:  http://localhost:${port}`);
    console.log(`Access on local network via ${LocalURL}`);
    qrcode.generate(LocalURL, { small: true });
});
