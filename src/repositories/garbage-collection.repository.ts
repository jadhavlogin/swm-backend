import {DefaultCrudRepository} from '@loopback/repository';
import {GarbageCollection, GarbageCollectionRelations} from '../models';
import {SqlserverDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class GarbageCollectionRepository extends DefaultCrudRepository<
  GarbageCollection,
  typeof GarbageCollection.prototype.garbageId,
  GarbageCollectionRelations
> {
  constructor(
    @inject('datasources.sqlserver') dataSource: SqlserverDataSource,
  ) {
    super(GarbageCollection, dataSource);
  }
}
