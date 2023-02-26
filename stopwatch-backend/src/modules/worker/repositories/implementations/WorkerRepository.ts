import { ICreateWorkerDTO } from '@modules/worker/dtos/ICreateWorkerDTO';
import { Worker } from '@prisma/client';
import { prismaClient } from '@shared/infra/prisma';

import { IWorkerRepository } from '../IWorkerRepository';

export class WorkerRepository implements IWorkerRepository {
    constructor(private readonly ctx = { prisma: prismaClient }) {}

    async create({ code }: ICreateWorkerDTO): Promise<Worker> {
        const worker = await this.ctx.prisma.worker.create({
            data: {
                code,
            },
        });

        return worker;
    }

    async findById(id: string): Promise<Worker | null> {
        const worker = await this.ctx.prisma.worker.findUnique({
            where: {
                id,
            },
        });

        return worker;
    }
}
