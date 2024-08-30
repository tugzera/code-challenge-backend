import { HttpStatus } from '@nestjs/common';
import { UserTypeormModel } from 'src/shared/infra/database/models/user.model';
import { CreateUserDto } from 'src/users/presentation/dtos/inputs';
import { agent } from 'supertest';
import { app, databaseConnection } from 'test/setup';

describe('UserController (e2e)', () => {
  describe('@POST /users', () => {
    const url = '/users';
    it('should throw BadRequestException if provided params not pass on validation pipe', async () => {
      await agent(app.getHttpServer())
        .post(url)
        .send({})
        .expect(({ status, body }) => {
          expect(status).toBe(HttpStatus.BAD_REQUEST);
          expect(body).toStrictEqual({
            message: [
              'firstName must be shorter than or equal to 100 characters',
              'firstName must be longer than or equal to 3 characters',
              'firstName must be a string',
              'firstName should not be empty',
              'lastName must be shorter than or equal to 100 characters',
              'lastName must be longer than or equal to 3 characters',
              'lastName must be a string',
              'lastName should not be empty',
              'email must be an email',
              'email should not be empty',
              'password should not be empty',
              'password must be a string',
              'password must be longer than or equal to 8 characters',
              'password must be shorter than or equal to 100 characters',
              'password too weak',
            ],
            error: 'Bad Request',
            statusCode: 400,
          });
        });
    });

    it('should create a new user on success', async () => {
      const params: CreateUserDto = {
        firstName: 'Henrique',
        lastName: 'Damasceno',
        email: 'henrique@teste.com',
        password: '.Senha123',
      };
      await agent(app.getHttpServer())
        .post(url)
        .send(params)
        .expect(({ status, body }) => {
          expect(status).toBe(HttpStatus.CREATED);
          expect(body.id).toBeDefined();
          expect(body.firstName).toBe(params.firstName);
          expect(body.lastName).toBe(params.lastName);
          expect(body.email).toBe(params.email);
        });
      const checkUser = await databaseConnection
        .getRepository(UserTypeormModel)
        .findOne({
          where: {
            email: params.email,
          },
        });
      expect(checkUser.passwordHash).not.toBe(params.password);
    });
  });
});
