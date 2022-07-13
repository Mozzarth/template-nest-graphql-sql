import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';
import { DeepPartial, FilterQuery, Repository } from 'typeorm';
import { EntitySchemaFactory } from './entity-schema-factory';
import { Injectable } from '@nestjs/common';

@Injectable()
export abstract class EntityRepository<TSchema, TEntity> {
  constructor(
    protected readonly entityModel: Repository<TSchema>,
    protected readonly entitySchemaFactory: EntitySchemaFactory<
      TSchema,
      TEntity
    >,
  ) {}

  protected async findOneById(id: string): Promise<TEntity | null> {
    const result = await this.entityModel.findOne(id);
    return result ? this.entitySchemaFactory.createFromSchema(result) : null;
  }

  protected async findOne(
    entityFilterQuery: FilterQuery<TEntity>,
  ): Promise<TEntity | null> {
    const entityDocument = await this.entityModel.findOne(entityFilterQuery);
    if (!entityDocument) {
      return null;
    }
    return this.entitySchemaFactory.createFromSchema(entityDocument);
  }

  protected async findRegister(
    entityFilterQuery: FilterQuery<TEntity>,
  ): Promise<TEntity[]> {
    const result = await this.entityModel.find(entityFilterQuery);

    return result.map((entityDocument) =>
      this.entitySchemaFactory.createFromSchema(entityDocument),
    );
  }

  protected async findRegisterAll(): Promise<TEntity[]> {
    const result = await this.entityModel.find();
    return result.map((entityDocument) =>
      this.entitySchemaFactory.createFromSchema(entityDocument),
    );
  }

  protected async registerInsert(entity: TEntity): Promise<void> {
    const schemaObject = this.entitySchemaFactory.create(entity);
    await this.entityModel.insert(schemaObject);
  }

  protected async registerInsertMany(entities: TEntity[]): Promise<void> {
    const schemaObjects: TSchema[] = [];
    entities.forEach((entity) => {
      schemaObjects.push(this.entitySchemaFactory.create(entity));
    });
    await this.entityModel.insert(schemaObjects);
  }

  protected async registerUpdateById(
    id: number,
    entity: Partial<TEntity>,
  ): Promise<boolean> {
    const schemaObject = this.cleanUndefinedPartial(
      this.entitySchemaFactory.createPartial(entity),
    );
    const resultOperation = await this.entityModel.update(id, schemaObject);
    return resultOperation.affected > 0;
  }

  private cleanUndefinedPartial(object: DeepPartial<TSchema>) {
    const schemaPartial: any = {};
    const keys = Object.keys(object);
    keys.map((key) => {
      if (object[key] !== undefined) schemaPartial[key] = object[key];
    });
    return schemaPartial as QueryDeepPartialEntity<TSchema>;
  }
}
