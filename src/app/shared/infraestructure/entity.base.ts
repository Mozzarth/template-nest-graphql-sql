import { PrimaryColumn } from 'typeorm';

export abstract class BaseEntitySchema {
  @PrimaryColumn()
  public id!: string;
}
