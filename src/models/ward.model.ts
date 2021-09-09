import { Entity, model, property } from '@loopback/repository';

@model({ settings: { strict: false } })
export class Ward extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: false,
  })
  wardId?: number;

  @property({
    type: 'number',
    required: true,
  })
  wardNo: number;

  @property({
    type: 'string',
    required: true,
  })
  wardName: string;

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
  })
  actionOn?: string;

  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<Ward>) {
    super(data);
  }
}

export interface WardRelations {
  // describe navigational properties here
}

export type WardWithRelations = Ward & WardRelations;
