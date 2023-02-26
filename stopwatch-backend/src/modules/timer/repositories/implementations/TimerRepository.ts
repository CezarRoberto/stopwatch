import { ICreateTimerDTO } from '@modules/timer/dtos/ICreateTimerDTO';
import { Timer } from '@prisma/client';
import { prismaClient } from '@shared/infra/prisma';

import { ITimerRepository } from '../ITimerRepository';

export class TimerRepository implements ITimerRepository {
    constructor(private readonly ctx = { prisma: prismaClient }) {}

    async create({ date, workerId }: ICreateTimerDTO): Promise<Timer> {
        const timer = await this.ctx.prisma.timer.create({
            data: {
                date,
                workerId,
            },
        });

        return timer;
    }

    async ListByWorkerId(workerId: string): Promise<Timer[]> {
        const timer = await this.ctx.prisma.timer.findMany({
            where: {
                workerId,
            },
        });

        return timer;
    }
}
