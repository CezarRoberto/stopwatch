import { ICreateWorkerDTO } from '@modules/worker/dtos/ICreateWorkerDTO';
import { WorkerRepository } from '@modules/worker/repositories/implementations/WorkerRepository';
import {
    Context,
    createMockContext,
    MockContext,
} from '@shared/infra/prisma/context';

describe('WorkerRepository', () => {
    let mockCtx: MockContext;
    let ctx: Context;
    let sut: WorkerRepository;

    beforeEach(() => {
        mockCtx = createMockContext();
        ctx = mockCtx as unknown as Context;
        sut = new WorkerRepository(ctx);
    });

    describe('Create', () => {
        it('should be able to create a new worker', async () => {
            const worker = {
                id: 'any_id',
                code: 'any_code',
                isWorking: true,
                createdAt: new Date('2022-08-23T17:33:38.232Z'),
                updatedAt: new Date('2022-08-23T17:33:38.232Z'),
            };

            mockCtx.prisma.worker.create.mockResolvedValue(worker);

            const data: ICreateWorkerDTO = {
                code: 'any_code',
            };

            const request = await sut.create(data);

            expect(request).toEqual(worker);
        });
    });

    describe('Find By Worker Id', () => {
        it('should be able to find by id', async () => {
            const worker = {
                id: 'any_id',
                code: 'any_code',
                isWorking: true,
                createdAt: new Date('2022-08-23T17:33:38.232Z'),
                updatedAt: new Date('2022-08-23T17:33:38.232Z'),
            };

            mockCtx.prisma.worker.findUnique.mockResolvedValue(worker);

            const request = await sut.findById('any_id');

            expect(request).toEqual(worker);
        });

        it('should be throw when worker have not found', async () => {
            mockCtx.prisma.worker.findUnique.mockResolvedValue(null);

            const request = await sut.findById('any_id');

            expect(request).toEqual(null);
        });
    });
});
