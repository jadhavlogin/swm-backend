import {DefaultCrudRepository} from '@loopback/repository';
import {PalikaHomes, PalikaHomesRelations} from '../models';
import {SqlserverDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class PalikaHomesRepository extends DefaultCrudRepository<
  PalikaHomes,
  typeof PalikaHomes.prototype.homeId,
  PalikaHomesRelations
> {
  constructor(
    @inject('datasources.sqlserver') dataSource: SqlserverDataSource,
  ) {
    super(PalikaHomes, dataSource);
  }
}
