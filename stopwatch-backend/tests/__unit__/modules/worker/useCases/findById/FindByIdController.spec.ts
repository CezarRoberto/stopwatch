/* eslint-disable @typescript-eslint/no-explicit-any */
import { mock, MockProxy } from 'jest-mock-extended';
import { container } from 'tsyringe';

import { IWorkerRepository } from '@modules/worker/repositories/IWorkerRepository';
import { FindByIdController } from '@modules/worker/useCases/findById/FindByIdController';
import { FindByIdUseCase } from '@modules/worker/useCases/findById/FindByIdUseCase';

const tsyringeContainerMock = jest.spyOn(container, 'resolve');

describe('FindByIdController', () => {
    let workerRepository: MockProxy<IWorkerRepository>;
    let sut: FindByIdController;

    beforeEach(() => {
        workerRepository = mock();
        workerRepository.findById.mockResolvedValue({
            id: 'any_id',
            code: 'any_code',
            isWorking: true,
            createdAt: new Date('2022-08-23T17:33:38.232Z'),
            updatedAt: new Date('2022-08-23T17:33:38.232Z'),
        });

        tsyringeContainerMock.mockImplementation(() => ({
            execute: () => {
                const timer = new FindByIdUseCase(workerRepository);
                return timer.execute({ id: 'any_id' });
            },
        }));

        sut = new FindByIdController();
    });

    it('should be able to find a worker', async () => {
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
        expect(response.status().json).toBeCalledWith({
            id: 'any_id',
            code: 'any_code',
            isWorking: true,
            createdAt: new Date('2022-08-23T17:33:38.232Z'),
            updatedAt: new Date('2022-08-23T17:33:38.232Z'),
        });
    });
});
