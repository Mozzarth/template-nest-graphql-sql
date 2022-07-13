import { DeepPartial } from 'typeorm';

export interface EntitySchemaFactory<TSchema, TEntity> {
  create(entity: TEntity): TSchema;
  createFromSchema(entitySchema: TSchema): TEntity;
  createPartial(entity: Partial<TEntity>): DeepPartial<TSchema>;
}
