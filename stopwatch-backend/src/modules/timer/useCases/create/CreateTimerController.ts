import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { CreatetimerUseCase } from './CreateTimerUseCase';

export class CreatetimerController {
    async handle(request: Request, response: Response): Promise<Response> {
        const { date, workerId } = request.body;

        const createtimerUseCase = container.resolve(CreatetimerUseCase);

        const timer = await createtimerUseCase.execute({
            date,
            workerId,
        });

        return response.status(201).json(timer);
    }
}
