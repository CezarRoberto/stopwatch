import { mock, MockProxy } from 'jest-mock-extended';

import { IWorkerRepository } from '@modules/worker/repositories/IWorkerRepository';
import { CreateWorkerUseCase } from '@modules/worker/useCases/create/CreateWorkerUseCase';

describe('Create Worker Use Case', () => {
    let workerRepository: MockProxy<IWorkerRepository>;
    let sut: CreateWorkerUseCase;

    beforeEach(() => {
        workerRepository = mock();
        workerRepository.create.mockResolvedValue({
            id: 'any_id',
            code: 'any_code',
            isWorking: true,
            createdAt: new Date('2022-08-23T17:33:38.232Z'),
            updatedAt: new Date('2022-08-23T17:33:38.232Z'),
        });

        sut = new CreateWorkerUseCase(workerRepository);
    });

    it('should be able to create a new worker', async () => {
        const request = await sut.execute({
            code: 'any_code',
        });

        expect(request).toEqual({
            id: 'any_id',
            code: 'any_code',
            isWorking: true,
            createdAt: new Date('2022-08-23T17:33:38.232Z'),
            updatedAt: new Date('2022-08-23T17:33:38.232Z'),
        });
    });
});
