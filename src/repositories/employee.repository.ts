import {DefaultCrudRepository} from '@loopback/repository';
import {Employee, EmployeeRelations} from '../models';
import {SqlserverDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class EmployeeRepository extends DefaultCrudRepository<
  Employee,
  typeof Employee.prototype.employeeId,
  EmployeeRelations
> {
  constructor(
    @inject('datasources.sqlserver') dataSource: SqlserverDataSource,
  ) {
    super(Employee, dataSource);
  }
}
