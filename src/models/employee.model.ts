import { Entity, model, property } from '@loopback/repository';

@model({ settings: { strict: false } })
export class Employee extends Entity {
  @property({
    type: 'number',
    id: true,
  })
  employeeId?: number;

  @property({
    type: 'string',
  })
  empName?: string;

  @property({
    type: 'string',
  })
  post?: string;

  @property({
    type: 'string',
  })
  qualification?: string;

  @property({
    type: 'number',
    required: true,
  })
  palikaId: number;

  @property({
    type: 'number',
    required: true,
  })
  wardId: number;

  @property({
    type: 'string',
  })
  userName?: string;

  @property({
    type: 'string',
  })
  password?: string;

  @property({
    type: 'string',
  })
  language?: string;

  @property({
    type: 'string',
  })
  vehicleNo?: string;

  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<Employee>) {
    super(data);
  }
}

export interface EmployeeRelations {
  // describe navigational properties here
}

export type EmployeeWithRelations = Employee & EmployeeRelations;
