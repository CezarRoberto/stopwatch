import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { FindByIdUseCase } from './FindByIdUseCase';

export class FindByIdController {
    async handle(request: Request, response: Response): Promise<Response> {
        const { id } = request.params;

        const findByIdUseCase = container.resolve(FindByIdUseCase);

        const worker = await findByIdUseCase.execute({ id });

        return response.status(200).json(worker);
    }
}
