import { HttpException, HttpStatus } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { UsersController } from './users.controller';
import { UsersServiceService } from './users.service.service';

export type MockType<T> = {
  [P in keyof T]?: jest.Mock<{}>;
};
export const repositoryMockFactory: () => MockType<Repository<any>> = jest.fn(() => ({
  findOne: jest.fn(entity => entity),
}));

describe('UsersController', () => {
  let controller: UsersController;
  let service: UsersServiceService;


  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [UsersServiceService,
        { provide: getRepositoryToken(User), useFactory: repositoryMockFactory}
      ],

    }).compile();

    service = module.get<UsersServiceService>(UsersServiceService);
    controller = module.get<UsersController>(UsersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('getAllusers', () => {
    it('should return an array of users', async () => {
      const expected = Promise.all([{ 
          id: 0, 
          firstname: 'John',
          lastname: 'Doe',
          age: 23
      }]);
      jest.spyOn(service, 'getAllusers').mockImplementation(() => expected);
      expect(await controller.getAllusers()).toBe(await expected);
    });
  });

  describe('getSpecificUser', () => {
    it('should return a single user, with the provided id', async () => {
      const expected = await Promise.all([{ 
        id: 0, 
          firstname: 'John',
          lastname: 'Doe',
          age: 23
      }]);
      jest.spyOn(service, 'getSpecificUser').mockImplementation(id => {
        return Promise.resolve(expected.find((user)=>user.id === id));
      });
      expect(await controller.getSpecificUser({id: 0})).toBe(expected[0]);
    })
  });
  describe('setSpecificUser', () => {
    it('should return a single user, with the provided id', async () => {
      const users_before = await Promise.all([{ 
        id: 0, 
        firstname: 'John',
        lastname: 'Doe',
        age: 24
      }]);
      const user_setter = {firstname :'Jane',lastname:'Doe',age : 23};
      const users_after = await Promise.all([{ 
        id: 0, 
        firstname : user_setter.firstname,
        lastname: user_setter.lastname,
        age: user_setter.age //26746
      }]);
      jest.spyOn(service, 'setSpecificUser').mockImplementation((id,firstname,lastname,age) => {
        const user = users_before.find((user)=>user.id === id);
        user.lastname = lastname;
        user.firstname = firstname;
        user.age = age;
        return Promise.resolve(user);
      });
      expect(await controller.setSpecificUser({id :0},user_setter)).toStrictEqual(users_after[0]);
    })
  });

  describe('deleteSpecificUser', () => {
    it('should have no return', async () => {
      jest.spyOn(service, 'deleteSpecificUser').mockImplementation(async (id) => {
        try{
          await controller.getSpecificUser({id:id});
         }
         catch(error){
           throw error;
         }
        return Promise.resolve();
      });
      expect(await controller.deleteSpecificUser({id :0})).toBeUndefined();
    })
  });

}

);
