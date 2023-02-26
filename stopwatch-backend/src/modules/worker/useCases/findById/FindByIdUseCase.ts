import { inject, injectable } from 'tsyringe';

import { IWorkerRepository } from '@modules/worker/repositories/IWorkerRepository';
import { Worker } from '@prisma/client';
import { AppError } from '@shared/errors/AppError';

type IWorkerFindByIdRequest = {
    id: string;
};

@injectable()
export class FindByIdUseCase {
    constructor(
        @inject('WorkerRepository')
        private readonly workerRepository: IWorkerRepository,
    ) {}

    async execute({ id }: IWorkerFindByIdRequest): Promise<Worker> {
        const worker = await this.workerRepository.findById(id);

        if (!worker) {
            throw new AppError('Worker does not exists', 409, 'WORKER_ERROR');
        }

        return worker;
    }
}
