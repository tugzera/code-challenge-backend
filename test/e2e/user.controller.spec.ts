import { HttpStatus } from '@nestjs/common';
import { randomUUID } from 'crypto';
import { User } from 'src/users/domain/entities/user';
import {
  UserEmailAlreadyRegisteredException,
  UserNotFoundException,
} from 'src/users/domain/exceptions';
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
      await userFactory.repository.softDelete(createdUser.id);
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
      const checkUser = await userFactory.repository.findOne({
        where: {
          email: params.email,
        },
      });
      expect(checkUser.passwordHash).not.toBe(params.password);
      await userFactory.repository.softDelete(checkUser.id);
    });
  });

  describe('@GET /users', () => {
    const url = '/users';
    let userList: User[];

    beforeAll(async () => {
      userList = await userFactory.generateRegisters({
        count: 10,
      });
    });

    it('should return user list on success', async () => {
      await agent(app.getHttpServer())
        .get(url)
        .expect(({ status, body }) => {
          expect(status).toBe(HttpStatus.OK);
          expect(body.items.length).toBe(userList.length);
          expect(body.totalItems).toBe(userList.length);
          expect(body.page).toBe(1);
          expect(body.pageSize).toBe(10);
          expect(body.totalPages).toBe(1);
        });
    });

    it('should return paginated user list on success', async () => {
      const params = {
        page: 1,
        pageSize: 1,
      };
      await agent(app.getHttpServer())
        .get(url)
        .query(params)
        .expect(({ status, body }) => {
          expect(status).toBe(HttpStatus.OK);
          expect(body.items.length).toBe(params.pageSize);
          expect(body.totalItems).toBe(userList.length);
          expect(body.page).toBe(params.page);
          expect(body.totalPages).toBe(userList.length);
        });
    });

    it('should return sorted user list on success', async () => {
      const sortedUserList = userList.sort((a, b) => {
        if (a.firstName.toLocaleLowerCase() > b.firstName.toLocaleLowerCase())
          return 1;
        if (a.firstName.toLocaleLowerCase() < b.firstName.toLocaleLowerCase())
          return -1;
        return 0;
      });
      const params = {
        sortBy: 'firstName',
        sortDirection: 'ASC',
      };
      await agent(app.getHttpServer())
        .get(url)
        .query(params)
        .expect(({ status, body }) => {
          expect(status).toBe(HttpStatus.OK);
          const requestUserList = body.items.map((item) => item.firstName);
          expect(requestUserList).toStrictEqual(
            sortedUserList.map((item) => item.firstName),
          );
        });
    });

    it('should return filtered user list on success', async () => {
      const userSearch = userList[4];
      const params = {
        searchString: userSearch.email,
      };
      await agent(app.getHttpServer())
        .get(url)
        .query(params)
        .expect(({ status, body }) => {
          expect(status).toBe(HttpStatus.OK);
          expect(body.items.length).toBe(1);
          expect(body.items[0].email).toBe(userSearch.email);
        });
    });
  });

  describe('@PATCH /users', () => {
    const url = '/users/:userId';
    it('should throw BadRequestException if provided userId is not an valid uuid', async () => {
      await agent(app.getHttpServer())
        .patch(url)
        .expect(({ status }) => {
          expect(status).toBe(HttpStatus.BAD_REQUEST);
        });
    });

    it('should throw BadRequestException if provided params not pass on validation pipe', async () => {
      const userId = randomUUID();
      await agent(app.getHttpServer())
        .patch(url.replace(':userId', userId))
        .send({ email: '', firstName: '', lastName: '', password: '' })
        .expect(({ status, body }) => {
          expect(status).toBe(HttpStatus.BAD_REQUEST);
          expect(body).toStrictEqual({
            error: {
              firstName: ['must be longer than or equal to 3 characters'],
              lastName: ['must be longer than or equal to 3 characters'],
              email: ['must be an email'],
              password: [
                'must be longer than or equal to 8 characters',
                'too weak',
              ],
            },
            code: 'BadRequestException',
            translationMessage: 'Verifique seus dados',
          });
        });
    });

    it('should throw UserNotFoundException if provided userId is not found', async () => {
      const userId = randomUUID();
      await agent(app.getHttpServer())
        .patch(url.replace(':userId', userId))
        .expect(({ status, body }) => {
          const error = new UserNotFoundException();
          expect(status).toBe(error.code);
          expect(body.error).toBe(error.message);
          expect(body.code).toBe(error.name);
        });
    });

    it('should throw UserEmailAlreadyRegisteredException if provided email is already in use', async () => {
      const [createdUser] = await userFactory.generateRegisters({});
      const [otherUser] = await userFactory.generateRegisters({});
      const params = {
        firstName: 'Joseph',
        lastName: 'Climber',
        email: otherUser.email,
      };
      await agent(app.getHttpServer())
        .patch(url.replace(':userId', createdUser.id))
        .send(params)
        .expect(({ status, body }) => {
          const error = new UserEmailAlreadyRegisteredException();
          expect(status).toBe(error.code);
          expect(body.error).toBe(error.message);
          expect(body.code).toBe(error.name);
        });
      await userFactory.repository.softDelete(createdUser.id);
      await userFactory.repository.softDelete(otherUser.id);
    });

    it('should update user successfully', async () => {
      const [createdUser] = await userFactory.generateRegisters({});
      const params = {
        firstName: 'Joseph',
        lastName: 'Climber',
        email: createdUser.email,
        password: '.Senha1123',
      };
      await agent(app.getHttpServer())
        .patch(url.replace(':userId', createdUser.id))
        .send(params)
        .expect(({ status, body }) => {
          expect(status).toBe(HttpStatus.OK);
          expect(body.id).toBe(createdUser.id);
          expect(body.firstName).toBe(params.firstName);
          expect(body.lastName).toBe(params.lastName);
          expect(body.email).toBe(params.email);
          expect(body.createdAt).not.toBe(body.updatedAt);
        });
      const checkUser = await userFactory.repository.findOne({
        where: {
          id: createdUser.id,
        },
      });
      expect(createdUser.password).not.toBe(checkUser?.passwordHash);
      await userFactory.repository.softDelete(createdUser.id);
    });
  });

  describe('@DELETE /users', () => {
    const url = '/users/:userId';
    it('should throw BadRequestException if provided userId is not an valid uuid', async () => {
      await agent(app.getHttpServer())
        .delete(url)
        .expect(({ status }) => {
          expect(status).toBe(HttpStatus.BAD_REQUEST);
        });
    });

    it('should throw UserNotFoundException if provided userId was not found', async () => {
      const userId = randomUUID();
      await agent(app.getHttpServer())
        .delete(url.replace(':userId', userId))
        .expect(({ status, body }) => {
          const error = new UserNotFoundException();
          expect(status).toBe(error.code);
          expect(body.error).toBe(error.message);
          expect(body.code).toBe(error.name);
        });
    });

    it('should delete user on success', async () => {
      const [createdUser] = await userFactory.generateRegisters({});
      await agent(app.getHttpServer())
        .delete(url.replace(':userId', createdUser.id))
        .expect(({ status }) => {
          expect(status).toBe(HttpStatus.NO_CONTENT);
        });
      const checkUser = await userFactory.repository.findOne({
        where: {
          id: createdUser.id,
        },
        withDeleted: true,
      });
      expect(checkUser.deletedAt).not.toBeNull();
    });
  });
});
