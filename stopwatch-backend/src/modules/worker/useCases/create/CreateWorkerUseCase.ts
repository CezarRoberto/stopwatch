import { inject, injectable } from 'tsyringe';

import { IWorkerRepository } from '@modules/worker/repositories/IWorkerRepository';
import { Worker } from '@prisma/client';

type IWorkerCreateRequest = {
    code: string;
};

@injectable()
export class CreateWorkerUseCase {
    constructor(
        @inject('WorkerRepository')
        private readonly workerRepository: IWorkerRepository,
    ) {}

    async execute({ code }: IWorkerCreateRequest): Promise<Worker> {
        const worker = await this.workerRepository.create({
            code,
        });

        return worker;
    }
}
