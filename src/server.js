import express from 'express';
import router from './routes.js';
import cors from 'cors';

const app = express();
const port = process.env.PORT || 5000;
const host = process.env.NODE_ENV !== 'production' ? 'localhost' : '0.0.0.0';

app.use(cors({
  origin: '*',
}));
app.use(express.json());
app.use('/', router);

app.listen(port, () => {
  console.log(`Server is running at http://${host}:${port}`);
});