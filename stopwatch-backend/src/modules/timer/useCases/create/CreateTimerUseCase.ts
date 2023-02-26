import { inject, injectable } from 'tsyringe';

import { ITimerRepository } from '@modules/timer/repositories/ITimerRepository';
import { IWorkerRepository } from '@modules/worker/repositories/IWorkerRepository';
import { Timer } from '@prisma/client';
import { AppError } from '@shared/errors/AppError';

type ITimerCreateRequest = {
    workerId: string;
    date: Date;
};

@injectable()
export class CreatetimerUseCase {
    constructor(
        @inject('TimerRepository')
        private readonly timersRepository: ITimerRepository,
        @inject('WorkerRepository')
        private readonly workerRepository: IWorkerRepository,
    ) {}

    async execute({ date, workerId }: ITimerCreateRequest): Promise<Timer> {
        const worker = await this.workerRepository.findById(workerId);
        if (!worker) {
            throw new AppError('Worker does not exists', 409, 'WORKER_ERROR');
        }

        const datetoRefactor = new Date(date);
        const refactoredDate = `${datetoRefactor.getHours()}:${datetoRefactor.getMinutes()}`;
        const timer = await this.timersRepository.create({
            date: refactoredDate,
            workerId,
        });

        return timer;
    }
}
