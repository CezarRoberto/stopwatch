import { Router } from 'express';

import { timerRouter } from './timer.router';
import { workerRouter } from './worker.router';

const routes = Router();

routes.use('/worker', workerRouter);
routes.use('/timer', timerRouter);
routes.use('*', async (request, response) => {
    return response.status(404).json({
        status: 'Not found',
        message: 'Rota não encontrada',
    });
});

export { routes };
