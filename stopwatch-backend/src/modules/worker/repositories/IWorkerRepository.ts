import { Worker } from '@prisma/client';

import { ICreateWorkerDTO } from '../dtos/ICreateWorkerDTO';

export interface IWorkerRepository {
    create(params: ICreateWorkerDTO): Promise<Worker>;
    findById(id: string): Promise<Worker | null>;
}
