import { Router } from 'express';

import { CreateWorkerController } from '@modules/worker/useCases/create/CreateWorkerController';
import { FindByIdController } from '@modules/worker/useCases/findById/FindByIdController';

import { ensureCodeIsEnough } from '../middlewares/createtimer';
import { ensureAdmin } from '../middlewares/ensureAdmin';

const workerRouter = Router();

const createWorkerController = new CreateWorkerController();
const findByIdController = new FindByIdController();

workerRouter.get('/:id', findByIdController.handle);
workerRouter.post(
    '/',
    ensureCodeIsEnough,
    ensureAdmin,
    createWorkerController.handle,
);

export { workerRouter };
