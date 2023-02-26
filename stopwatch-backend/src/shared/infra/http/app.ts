import 'reflect-metadata';
import 'express-async-errors';

import { errors } from 'celebrate';
import cors from 'cors';
import express from 'express';
import actuator from 'express-actuator';
import { createServer } from 'http';
import morgan from 'morgan';

import { actuatorOptions } from '@config/actuator';
import { getErrors } from '@shared/errors/getErrors';

import '../../containers';
import { routes } from './routes';

const app = express();

const httpServer = createServer(app);

app.use(morgan('dev'));
app.use(
    cors({
        origin: '*',
        credentials: false,
    }),
);
app.use(actuator(actuatorOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(routes);
app.use(errors());
app.use(getErrors);

export { app, httpServer };
