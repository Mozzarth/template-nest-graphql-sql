import { UserRegisterServiceContainer } from '../../register-user/infrastructure/user-register.container';
import { UserRegisterRepository } from '../../register-user/infrastructure/register-user.repository';
import { RegisterUserResolver } from '../../register-user/infrastructure/register-user.resolver';
import { UserEntityFactory } from './user-entity-factory';
import { UserEntity } from './user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity])],
  providers: [
    UserRegisterServiceContainer,
    UserRegisterRepository,
    RegisterUserResolver,
    UserEntityFactory,
  ],
})
export class UserModule {}
