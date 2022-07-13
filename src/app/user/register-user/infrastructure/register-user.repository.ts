import { EntityRepository } from 'src/app/shared/infraestructure/entity.repository';
import { UserEntityFactory } from '../../shared/infrastructure/user-entity-factory';
import { UserEntity } from '../../shared/infrastructure/user.entity';
import { IUserRegisterRepository } from '../domain/user.create';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../../shared/domain/user';
import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';

@Injectable()
export class UserRegisterRepository
  extends EntityRepository<UserEntity, User>
  implements IUserRegisterRepository
{
  constructor(
    @InjectRepository(UserEntity)
    repository: Repository<UserEntity>,
    factory: UserEntityFactory,
  ) {
    super(repository, factory);
  }

  async save(user: User): Promise<void> {
    await this.registerInsert(user);
  }
}
