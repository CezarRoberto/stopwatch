import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { ListByWorkerIdUseCase } from './ListByWorkerIdUseCase';

export class ListByWorkerIdController {
    async handle(request: Request, response: Response): Promise<Response> {
        const { workerId } = request.params;

        const listByWorkerIdUseCase = container.resolve(ListByWorkerIdUseCase);

        const listtimers = await listByWorkerIdUseCase.execute(workerId);

        return response.status(200).json(listtimers);
    }
}
