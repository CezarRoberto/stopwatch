import { Router } from 'express';

import { CreatetimerController } from '@modules/timer/useCases/create/CreateTimerController';
import { ListByWorkerIdController } from '@modules/timer/useCases/list-by-worker-id/ListByWorkerIdController';

const timerRouter = Router();

const createtimerController = new CreatetimerController();
const findByWorkerIdController = new ListByWorkerIdController();

timerRouter.post('/', createtimerController.handle);
timerRouter.get('/:workerId', findByWorkerIdController.handle);

export { timerRouter };
