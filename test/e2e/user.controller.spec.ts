import { HttpStatus } from '@nestjs/common';
import { UserTypeormModel } from 'src/shared/infra/database/models/user.model';
import { UserEmailAlreadyRegisteredException } from 'src/users/domain/exceptions';
import { CreateUserDto } from 'src/users/presentation/dtos/inputs';
import { agent } from 'supertest';
import { UserFactory } from 'test/factories';
import { app, databaseConnection } from 'test/setup';

describe('UserController (e2e)', () => {
  let userFactory: UserFactory;

  beforeAll(async () => {
    userFactory = new UserFactory(databaseConnection);
  });

  afterAll(async () => {
    await userFactory.deleteRegisters();
  });

  describe('@POST /users', () => {
    const url = '/users';
    it('should throw BadRequestException if provided params not pass on validation pipe', async () => {
      await agent(app.getHttpServer())
        .post(url)
        .send({})
        .expect(({ status, body }) => {
          expect(status).toBe(HttpStatus.BAD_REQUEST);
          expect(body).toStrictEqual({
            error: {
              firstName: [
                'must be shorter than or equal to 100 characters',
                'must be longer than or equal to 3 characters',
                'must be a string',
                'should not be empty',
              ],
              lastName: [
                'must be shorter than or equal to 100 characters',
                'must be longer than or equal to 3 characters',
                'must be a string',
                'should not be empty',
              ],
              email: ['must be an email', 'should not be empty'],
              password: [
                'should not be empty',
                'must be a string',
                'must be longer than or equal to 8 characters',
                'must be shorter than or equal to 100 characters',
                'too weak',
              ],
            },
            code: 'BadRequestException',
            translationMessage: 'Verifique seus dados',
          });
        });
    });

    it('should throw UserEmailAlreadyRegisteredException if provided email is already in user', async () => {
      const [createdUser] = await userFactory.generateRegisters({});
      await agent(app.getHttpServer())
        .post(url)
        .send({
          firstName: createdUser.firstName,
          lastName: createdUser.lastName,
          email: createdUser.email,
          password: '.Senha123',
        })
        .expect(({ status, body }) => {
          const error = new UserEmailAlreadyRegisteredException();
          expect(status).toBe(error.code);
          expect(body.error).toBe(error.message);
          expect(body.code).toBe(error.name);
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
