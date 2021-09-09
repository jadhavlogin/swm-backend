import {DefaultCrudRepository} from '@loopback/repository';
import {NagarPalika, NagarPalikaRelations} from '../models';
import {SqlserverDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class NagarPalikaRepository extends DefaultCrudRepository<
  NagarPalika,
  typeof NagarPalika.prototype.palikaId,
  NagarPalikaRelations
> {
  constructor(
    @inject('datasources.sqlserver') dataSource: SqlserverDataSource,
  ) {
    super(NagarPalika, dataSource);
  }
}
