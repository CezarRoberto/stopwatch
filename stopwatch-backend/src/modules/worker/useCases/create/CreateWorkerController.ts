import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { CreateWorkerUseCase } from './CreateWorkerUseCase';

export class CreateWorkerController {
    async handle(request: Request, response: Response): Promise<Response> {
        const { code } = request.body;

        const createWorkerUseCase = container.resolve(CreateWorkerUseCase);

        const worker = await createWorkerUseCase.execute({
            code,
        });

        return response.status(201).json(worker);
    }
}
