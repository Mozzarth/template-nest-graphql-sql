import { EntitySchemaFactory } from 'src/app/shared/infraestructure/entity-schema-factory';
import { EmailAddres } from 'src/app/shared/domain/value-objects/email/emailaddres';
import { UUID } from 'src/app/shared/domain/value-objects/uuid';
import { Injectable } from '@nestjs/common';
import { UserEntity } from './user.entity';
import { User } from '../domain/user';
import { DeepPartial } from 'typeorm';

@Injectable()
export class UserEntityFactory
  implements EntitySchemaFactory<UserEntity, User>
{
  createPartial(entity: Partial<User>): DeepPartial<UserEntity> {
    return {
      id: entity.id.value,
      email: entity.email.value,
      password: entity.password,
    };
  }
  create(entity: User): UserEntity {
    return {
      id: entity.id.value,
      email: entity.email.toString(),
      password: entity.password,
    };
  }
  createFromSchema(entitySchema: UserEntity): User {
    return new User({
      id: new UUID(entitySchema.id),
      email: new EmailAddres(entitySchema.email),
      password: entitySchema.password,
    });
  }
}
