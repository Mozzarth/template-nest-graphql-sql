import { BaseEntitySchema } from 'src/app/shared/infraestructure/entity.base';
import { Column, Entity } from 'typeorm';

@Entity({ name: 'users' })
export class UserEntity extends BaseEntitySchema {
  @Column()
  public email: string;

  @Column()
  public password: string;
}
