import { ICreateTimerDTO } from '@modules/timer/dtos/ICreateTimerDTO';
import { TimerRepository } from '@modules/timer/repositories/implementations/TimerRepository';
import {
    Context,
    createMockContext,
    MockContext,
} from '@shared/infra/prisma/context';

describe('timerRepository', () => {
    let mockCtx: MockContext;
    let ctx: Context;
    let sut: TimerRepository;

    beforeEach(() => {
        mockCtx = createMockContext();
        ctx = mockCtx as unknown as Context;
        sut = new TimerRepository(ctx);
    });

    describe('Create', () => {
        it('should be able to create a new timer', async () => {
            const timer = {
                id: 'any_id',
                date: new Date('2022-08-23T17:33:38.232Z'),
                workerId: 'any_worker_id',
                createdAt: new Date('2022-08-23T17:33:38.232Z'),
                updatedAt: new Date('2022-08-23T17:33:38.232Z'),
            };

            mockCtx.prisma.timer.create.mockResolvedValue(timer);

            const data: ICreateTimerDTO = {
                date: '2022-08-23T17:33:38.232Z',
                workerId: 'any_worker_id',
            };

            const request = await sut.create(data);

            expect(request).toEqual(timer);
        });
    });

    describe('Find By Worker Id', () => {
        it('should be able to find timers by worker id', async () => {
            const timers = [
                {
                    id: 'any_id',
                    date: new Date('2022-08-23T17:33:38.232Z'),
                    workerId: 'any_worker_id',
                    createdAt: new Date('2022-08-23T17:33:38.232Z'),
                    updatedAt: new Date('2022-08-23T17:33:38.232Z'),
                },
                {
                    id: 'any_id',
                    date: new Date('2022-08-23T17:33:38.232Z'),
                    workerId: 'any_worker_id',
                    createdAt: new Date('2022-08-23T17:33:38.232Z'),
                    updatedAt: new Date('2022-08-23T17:33:38.232Z'),
                },
            ];

            mockCtx.prisma.timer.findMany.mockResolvedValue(timers);

            const request = await sut.ListByWorkerId('any_worker_id');

            expect(request).toEqual(timers);
        });
    });
});
