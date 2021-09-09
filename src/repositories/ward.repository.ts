import {DefaultCrudRepository} from '@loopback/repository';
import {Ward, WardRelations} from '../models';
import {SqlserverDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class WardRepository extends DefaultCrudRepository<
  Ward,
  typeof Ward.prototype.wardId,
  WardRelations
> {
  constructor(
    @inject('datasources.sqlserver') dataSource: SqlserverDataSource,
  ) {
    super(Ward, dataSource);
  }
}
