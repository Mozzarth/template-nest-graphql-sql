import { UserRegisterServiceContainer } from './user-register.container';
import { UserEntity } from '../../shared/infrastructure/user.entity';
import { UserSchema } from '../../shared/infrastructure/user.schema';
import { Args, Mutation, Resolver, Query } from '@nestjs/graphql';
import { UserRegisterInput } from './dto';

@Resolver(() => UserEntity)
export class RegisterUserResolver {
  constructor(private readonly service: UserRegisterServiceContainer) {}

  @Mutation(() => UserSchema)
  async register(@Args() input: UserRegisterInput): Promise<UserSchema> {
    const { password, email } = input;
    const user = await this.service.handle({ email, password });
    return user.toPrimitives();
  }
  @Query(() => String)
  async hello() {
    return 'hello';
  }
}
