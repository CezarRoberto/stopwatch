/* eslint-disable @typescript-eslint/no-explicit-any */
import { mock, MockProxy } from 'jest-mock-extended';
import { container } from 'tsyringe';

import { IWorkerRepository } from '@modules/worker/repositories/IWorkerRepository';
import { CreateWorkerController } from '@modules/worker/useCases/create/CreateWorkerController';
import { CreateWorkerUseCase } from '@modules/worker/useCases/create/CreateWorkerUseCase';

const tsyringeContainerMock = jest.spyOn(container, 'resolve');

describe('Create Worker Controller', () => {
    let workerRepository: MockProxy<IWorkerRepository>;
    let sut: CreateWorkerController;

    beforeEach(() => {
        workerRepository = mock();
        workerRepository.create.mockResolvedValue({
            id: 'any_id',
            code: 'any_code',
            isWorking: true,
            createdAt: new Date('2022-08-23T17:33:38.232Z'),
            updatedAt: new Date('2022-08-23T17:33:38.232Z'),
        });

        tsyringeContainerMock.mockImplementation(() => ({
            execute: () => {
                const timer = new CreateWorkerUseCase(workerRepository);
                return timer.execute({ code: 'any_code' });
            },
        }));

        sut = new CreateWorkerController();
    });

    it('should be able to create a new worker', async () => {
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

        expect(response.status).toBeCalledWith(201);
        expect(response.status().json).toBeCalledWith({
            id: 'any_id',
            code: 'any_code',
            isWorking: true,
            createdAt: new Date('2022-08-23T17:33:38.232Z'),
            updatedAt: new Date('2022-08-23T17:33:38.232Z'),
        });
    });
});
