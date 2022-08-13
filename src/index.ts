// import 'dotenv/config';
import 'reflect-metadata';
import bodyParser from 'body-parser';
import cors from 'cors';
import express from 'express';

import './utils/response/customSuccess';
import { errorHandler } from './middleware/errorHandler';
import { dbCreateConnection } from './orm/dbCreateConnection';
import routes from './routes';

const dotenv = require('dotenv');
dotenv.config();

export const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/', routes);

app.use(errorHandler);

const port = process.env.PORT || 4000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

(async () => {
  await dbCreateConnection();
})();
