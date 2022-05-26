import { Injectable } from '@nestjs/common';

import { v4 } from 'uuid';

import { UserUpdateDto } from './dto';
import { UserModel } from './users.model';

@Injectable()
export class UsersService {
  private users: Array<UserModel> = [];

  createUser(email: string, age: number): UserModel {
    const userModel: UserModel = {
      id: v4(),
      email,
      age,
    };

    this.users.push(userModel);

    return userModel;
  }

  updateUser(userId: string, data: UserUpdateDto): UserModel {
    const user = this.users.find(({ id }) => id === userId);

    if (data.age) {
      user.age = data.age;
    }

    if (data.email) {
      user.email = data.email;
    }

    if (data.isSubscribed) {
      user.isSubscribed = data.isSubscribed;
    }

    return user;
  }

  getAllUsers(): Array<UserModel> {
    return this.users;
  }

  getOneUser(getOneUserArgs: string): UserModel {
    return this.users.find(({ id }) => id === getOneUserArgs);
  }

  deleteUser(userId: string): UserModel {
    const deletedUserIndex = this.users.findIndex(({ id }) => id === userId);

    const deletedUser = this.users[deletedUserIndex];

    this.users.splice(deletedUserIndex);

    return deletedUser;
  }
}
