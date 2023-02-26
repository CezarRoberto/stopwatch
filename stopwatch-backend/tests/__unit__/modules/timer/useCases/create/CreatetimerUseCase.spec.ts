import { MockProxy, mock } from 'jest-mock-extended';

import { ITimerRepository } from '@modules/timer/repositories/ITimerRepository';
import { CreatetimerUseCase } from '@modules/timer/useCases/create/CreateTimerUseCase';
import { IWorkerRepository } from '@modules/worker/repositories/IWorkerRepository';

describe('Create timer Use Case', () => {
    let timerRepository: MockProxy<ITimerRepository>;
    let workerRepository: MockProxy<IWorkerRepository>;
    let sut: CreatetimerUseCase;

    beforeEach(() => {
        timerRepository = mock();
        workerRepository = mock();
        workerRepository.findById.mockResolvedValue({
            id: 'any_id',
            code: 'any_code',
            isWorking: true,
            createdAt: new Date('2022-08-23T17:33:38.232Z'),
            updatedAt: new Date('2022-08-23T17:33:38.232Z'),
        });
        timerRepository.create.mockResolvedValue({
            id: 'any_id',
            date: new Date('2022-08-23T17:33:38.232Z'),
            workerId: 'any_worker_id',
            createdAt: new Date('2022-08-23T17:33:38.232Z'),
            updatedAt: new Date('2022-08-23T17:33:38.232Z'),
        });
        sut = new CreatetimerUseCase(timerRepository, workerRepository);
    });

    it('should be able to create a new timer', async () => {
        const request = await sut.execute({
            date: new Date('2022-08-23T17:33:38.232Z'),
            workerId: 'any_id',
        });

        expect(request).toEqual({
            id: 'any_id',
            date: new Date('2022-08-23T17:33:38.232Z'),
            workerId: 'any_worker_id',
            createdAt: new Date('2022-08-23T17:33:38.232Z'),
            updatedAt: new Date('2022-08-23T17:33:38.232Z'),
        });
    });

    it('should be able to throw error when worker does not exists', async () => {
        workerRepository.findById.mockResolvedValueOnce(null);

        const request = async () => {
            await sut.execute({
                date: new Date('2022-08-23T17:33:38.232Z'),
                workerId: 'any_id',
            });
        };

        expect(request()).rejects.toEqual({
            message: 'Worker does not exists',
            statusCode: 409,
            code: 'WORKER_ERROR',
        });
    });
});
