import { Entity, model, property } from '@loopback/repository';

@model({ settings: { strict: false } })
export class GarbageCollection extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: false,
  })
  garbageId?: number;

  @property({
    type: 'number',
    required: true,
  })
  homeId: number;

  @property({
    type: 'boolean',
    required: true,
  })
  wetCollected: boolean;

  @property({
    type: 'boolean',
    required: true,
  })
  dryCollected: boolean;

  @property({
    type: 'boolean',
    required: true,
  })
  deadlyCollected: boolean;

  @property({
    type: 'boolean',
    required: true,
  })
  ewasteCollected: boolean;

  @property({
    type: 'boolean',
    required: true,
  })
  noCollection: boolean;

  @property({
    type: 'string',
    required: true,
  })
  collectionDate: string;

  @property({
    type: 'number',
    required: true,
  })
  employeeId: number;

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

  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<GarbageCollection>) {
    super(data);
  }
}

export interface GarbageCollectionRelations {
  // describe navigational properties here
}

export type GarbageCollectionWithRelations = GarbageCollection & GarbageCollectionRelations;
