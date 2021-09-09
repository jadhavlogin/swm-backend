import {Entity, model, property} from '@loopback/repository';

@model({settings: {strict: false}})
export class NagarPalika extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: false,
  })
  palikaId?: number;

  @property({
    type: 'string',
    required: true,
  })
  name: string;

  @property({
    type: 'string',
  })
  address?: string;

  @property({
    type: 'date',
  })
  registerDate?: string;

  @property({
    type: 'boolean',
    required: true,
  })
  isActive: boolean;

  @property({
    type: 'date',
    required: true,
  })
  actionOn: string;

  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<NagarPalika>) {
    super(data);
  }
}

export interface NagarPalikaRelations {
  // describe navigational properties here
}

export type NagarPalikaWithRelations = NagarPalika & NagarPalikaRelations;
