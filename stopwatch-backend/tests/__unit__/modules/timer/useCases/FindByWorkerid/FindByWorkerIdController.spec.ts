/* eslint-disable @typescript-eslint/no-explicit-any */
import { MockProxy, mock } from 'jest-mock-extended';
import { container } from 'tsyringe';

import { ITimerRepository } from '@modules/timer/repositories/ITimerRepository';
import { ListByWorkerIdController } from '@modules/timer/useCases/list-by-worker-id/ListByWorkerIdController';
import { ListByWorkerIdUseCase } from '@modules/timer/useCases/list-by-worker-id/ListByWorkerIdUseCase';
import { IWorkerRepository } from '@modules/worker/repositories/IWorkerRepository';

const tsyringeContainerMock = jest.spyOn(container, 'resolve');

describe('List timers by Worker Id Controller', () => {
    let timerRepository: MockProxy<ITimerRepository>;
    let workerRepository: MockProxy<IWorkerRepository>;
    let sut: ListByWorkerIdController;

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
        timerRepository.ListByWorkerId.mockResolvedValue([
            {
                id: 'any_id',
                date: new Date('2022-08-23T17:33:38.232Z'),
                workerId: 'any_worker_id',
                createdAt: new Date('2022-08-23T17:33:38.232Z'),
                updatedAt: new Date('2022-08-23T17:33:38.232Z'),
            },
            {
                id: 'any_id 2',
                date: new Date('2022-08-23T17:33:38.232Z'),
                workerId: 'any_worker_id',
                createdAt: new Date('2022-08-23T17:33:38.232Z'),
                updatedAt: new Date('2022-08-23T17:33:38.232Z'),
            },
        ]);
        tsyringeContainerMock.mockImplementation(() => ({
            execute: () => {
                const timer = new ListByWorkerIdUseCase(
                    timerRepository,
                    workerRepository,
                );
                return timer.execute('any_worker_id');
            },
        }));

        sut = new ListByWorkerIdController();
    });

    it('should be able to return status and json correcty', async () => {
        const request: any = {
            params: jest.fn(),
            body: jest.fn(),
        };
        const statusResponse = {
            json: jest.fn(),
        };
        const response: any = {
            json: jest.fn(),
            status: jest.fn(() => statusResponse),
        };
        await sut.handle(request, response);

        expect(response.status).toBeCalledWith(200);
        expect(response.status().json).toBeCalledWith([
            {
                id: 'any_id',
                date: new Date('2022-08-23T17:33:38.232Z'),
                workerId: 'any_worker_id',
                createdAt: new Date('2022-08-23T17:33:38.232Z'),
                updatedAt: new Date('2022-08-23T17:33:38.232Z'),
            },
            {
                id: 'any_id 2',
                date: new Date('2022-08-23T17:33:38.232Z'),
                workerId: 'any_worker_id',
                createdAt: new Date('2022-08-23T17:33:38.232Z'),
                updatedAt: new Date('2022-08-23T17:33:38.232Z'),
            },
        ]);
    });
});
