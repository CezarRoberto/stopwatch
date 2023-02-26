import { mock, MockProxy } from 'jest-mock-extended';

import { IWorkerRepository } from '@modules/worker/repositories/IWorkerRepository';
import { FindByIdUseCase } from '@modules/worker/useCases/findById/FindByIdUseCase';

describe('FindByIdUseCase', () => {
    let workerRepository: MockProxy<IWorkerRepository>;
    let sut: FindByIdUseCase;

    beforeEach(() => {
        workerRepository = mock();
        workerRepository.findById.mockResolvedValue({
            id: 'any_id',
            code: 'any_code',
            isWorking: true,
            createdAt: new Date('2022-08-23T17:33:38.232Z'),
            updatedAt: new Date('2022-08-23T17:33:38.232Z'),
        });

        sut = new FindByIdUseCase(workerRepository);
    });

    it('should be able to find a worker', async () => {
        const request = await sut.execute({
            id: 'any_id',
        });

        expect(request).toEqual({
            id: 'any_id',
            code: 'any_code',
            isWorking: true,
            createdAt: new Date('2022-08-23T17:33:38.232Z'),
            updatedAt: new Date('2022-08-23T17:33:38.232Z'),
        });
    });

    it('should be able to throw error when worker does not exists', async () => {
        workerRepository.findById.mockResolvedValueOnce(null);

        const request = async () => {
            await sut.execute({
                id: 'any_id',
            });
        };

        expect(request()).rejects.toEqual({
            message: 'Worker does not exists',
            statusCode: 409,
            code: 'WORKER_ERROR',
        });
    });
});
