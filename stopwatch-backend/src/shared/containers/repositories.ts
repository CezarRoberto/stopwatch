import { container } from 'tsyringe';

import { TimerRepository } from '@modules/timer/repositories/implementations/TimerRepository';
import { ITimerRepository } from '@modules/timer/repositories/ITimerRepository';
import { WorkerRepository } from '@modules/worker/repositories/implementations/WorkerRepository';
import { IWorkerRepository } from '@modules/worker/repositories/IWorkerRepository';

container.registerSingleton<ITimerRepository>(
    'TimerRepository',
    TimerRepository,
);

container.registerSingleton<IWorkerRepository>(
    'WorkerRepository',
    WorkerRepository,
);
