import { Field, ObjectType } from '@nestjs/graphql';
import { User } from '../domain/user';

@ObjectType(User.name)
export class UserSchema {
  @Field(() => String)
  public id: string;

  @Field(() => String)
  public email: string;

  @Field(() => String)
  public password: string;
}
