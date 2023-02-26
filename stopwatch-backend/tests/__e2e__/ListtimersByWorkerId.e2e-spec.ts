/* eslint-disable import/no-extraneous-dependencies */
import supertest from 'supertest';

import { httpServer } from '@shared/infra/http/app';
import { prismaClient } from '@shared/infra/prisma';

describe('/GET/:workerId', () => {
    beforeAll(async () => {
        await prismaClient.$connect();
    });

    it('should ', async () => {
        const worker = await prismaClient.worker.create({
            data: {
                code: 'any_code',
            },
        });

        await prismaClient.timer.createMany({
            data: [
                {
                    date: '11:11',
                    workerId: worker.id,
                },
                {
                    date: '11:11',
                    workerId: worker.id,
                },
            ],
        });

        const request = await supertest(httpServer).get(`/timer/${worker.id}`);
        expect(request.status).toBe(200);
    });
    afterAll(async () => {
        await prismaClient.$disconnect();
    });
});
