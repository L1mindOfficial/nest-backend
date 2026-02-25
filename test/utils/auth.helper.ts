import { INestApplication } from '@nestjs/common';
import request from 'supertest';

export async function registerUser(
  app: INestApplication,
  data: Partial<{
    email: string;
    username: string;
    password: string;
  }>
) {
  return await request(app.getHttpServer()).post('/auth/register').send(data);
}

export async function loginUser(
  app: INestApplication,
  emailOrUsername: string,
  password: string
) {
  const res = await request(app.getHttpServer())
    .post('/v1/auth/login')
    .send({ email: emailOrUsername, password })
    .expect(201);

  return res.body.accessToken as string;
}

export async function loginUserWithAgent(
  app: INestApplication,
  email: string,
  password: string
) {
  const agent = request.agent(app.getHttpServer());

  await agent.post('/v1/auth/login').send({ email, password }).expect(201);

  return agent;
}

export function authenticatedRequest(app: INestApplication, token: string) {
  return request(app.getHttpServer()).set('Authorization', `Bearer ${token}`);
}
