import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';

import { UsersService } from './user.service';
import { UserModel } from './users.model';

@Resolver(() => UserModel)
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  @Query(() => UserModel)
  getOneUser(@Args('id', { type: () => String }) id: string): UserModel {
    return this.usersService.getOneUser(id);
  }

  @Query(() => [UserModel])
  getAllUsers(): Array<UserModel> {
    return this.usersService.getAllUsers();
  }

  @Mutation(() => UserModel)
  createUser(
    @Args('email', { type: () => String }) email: string,
    @Args('age', { type: () => Int }) age: number,
  ): UserModel {
    return this.usersService.createUser(email, age);
  }

  @Mutation(() => UserModel)
  updateUser(
    @Args('id', { type: () => String }) id: string,
    @Args('email', { type: () => String, nullable: true })
    email: string | null = null,
    @Args('age', { type: () => Int, nullable: true }) age: number | null = null,
    @Args('isSubscribed', { type: () => Boolean, nullable: true })
    isSubscribed: boolean | null = null,
  ): UserModel {
    return this.usersService.updateUser(id, {
      age,
      email,
      isSubscribed,
    });
  }

  @Mutation(() => UserModel)
  deleteUser(@Args({ name: 'id', type: () => String }) id: string): UserModel {
    return this.usersService.deleteUser(id);
  }
}
