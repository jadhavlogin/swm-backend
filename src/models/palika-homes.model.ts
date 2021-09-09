import {Entity, model, property} from '@loopback/repository';

@model({settings: {strict: false}})
export class PalikaHomes extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: false,
  })
  homeId?: number;

  @property({
    type: 'string',
    required: true,
  })
  ownerName: string;

  @property({
    type: 'number',
    required: true,
  })
  homeNo: number;

  @property({
    type: 'number',
    required: true,
  })
  wardId: number;

  @property({
    type: 'number',
    required: true,
  })
  palikaId: number;

  @property({
    type: 'boolean',
    required: true,
  })
  isActive: boolean;

  @property({
    type: 'string',
    required: true,
  })
  actionOn: string;

  @property({
    type: 'string',
    required: true,
  })
  address: string;

  @property({
    type: 'string',
    required: true,
  })
  vehicleNo: string;

  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<PalikaHomes>) {
    super(data);
  }
}

export interface PalikaHomesRelations {
  // describe navigational properties here
}

export type PalikaHomesWithRelations = PalikaHomes & PalikaHomesRelations;
