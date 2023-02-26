import { Timer } from "@prisma/client";
import { ICreateTimerDTO } from "../dtos/ICreateTimerDTO";

export interface ITimerRepository {
    create(params: ICreateTimerDTO): Promise<Timer>;
    ListByWorkerId(workerId: string): Promise<Timer[]>;
}