import { inject, injectable } from 'tsyringe';

import { ITimerRepository } from '@modules/timer/repositories/ITimerRepository';
import { IWorkerRepository } from '@modules/worker/repositories/IWorkerRepository';
import { Timer } from '@prisma/client';
import { AppError } from '@shared/errors/AppError';

@injectable()
export class ListByWorkerIdUseCase {
    constructor(
        @inject('TimerRepository')
        private readonly timersRepository: ITimerRepository,
        @inject('WorkerRepository')
        private readonly workerRepository: IWorkerRepository,
    ) {}

    async execute(workerId: string): Promise<Timer[]> {
        const worker = await this.workerRepository.findById(workerId);

        if (!worker) {
            throw new AppError('Worker does not exists', 409, 'WORKER_ERROR');
        }

        const timers = await this.timersRepository.ListByWorkerId(workerId);

        return timers;
    }
}
