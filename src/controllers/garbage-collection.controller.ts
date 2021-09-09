import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getFilterSchemaFor,
  getModelSchemaRef,
  getWhereSchemaFor,
  patch,
  put,
  del,
  requestBody,
} from '@loopback/rest';
import { GarbageCollection } from '../models';
import { GarbageCollectionRepository } from '../repositories';

export class GarbageCollectionController {
  constructor(
    @repository(GarbageCollectionRepository)
    public garbageCollectionRepository: GarbageCollectionRepository,
  ) { }

  @post('/garbagecollection', {
    responses: {
      '200': {
        description: 'GarbageCollection model instance',
        content: { 'application/json': { schema: getModelSchemaRef(GarbageCollection) } },
      },
    },
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(GarbageCollection, {
            title: 'NewGarbageCollection',
            exclude: ['garbageId'],
          }),
        },
      },
    })
    garbageCollection: Omit<GarbageCollection, 'garbageId'>,
  ): Promise<GarbageCollection> {
    return this.garbageCollectionRepository.create(garbageCollection);
  }

  @get('/garbagecollection/count', {
    responses: {
      '200': {
        description: 'GarbageCollection model count',
        content: { 'application/json': { schema: CountSchema } },
      },
    },
  })
  async count(
    @param.query.object('where', getWhereSchemaFor(GarbageCollection)) where?: Where<GarbageCollection>,
  ): Promise<Count> {
    return this.garbageCollectionRepository.count(where);
  }

  @get('/garbagecollection', {
    responses: {
      '200': {
        description: 'Array of GarbageCollection model instances',
        content: {
          'application/json': {
            schema: { type: 'array', items: getModelSchemaRef(GarbageCollection) },
          },
        },
      },
    },
  })
  async find(
    @param.query.object('filter', getFilterSchemaFor(GarbageCollection)) filter?: Filter<GarbageCollection>,
  ): Promise<GarbageCollection[]> {
    return this.garbageCollectionRepository.find(filter);
  }

  @patch('/garbagecollection', {
    responses: {
      '200': {
        description: 'GarbageCollection PATCH success count',
        content: { 'application/json': { schema: CountSchema } },
      },
    },
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(GarbageCollection, { partial: true }),
        },
      },
    })
    garbageCollection: GarbageCollection,
    @param.query.object('where', getWhereSchemaFor(GarbageCollection)) where?: Where<GarbageCollection>,
  ): Promise<Count> {
    return this.garbageCollectionRepository.updateAll(garbageCollection, where);
  }

  @get('/garbagecollection/{id}', {
    responses: {
      '200': {
        description: 'GarbageCollection model instance',
        content: { 'application/json': { schema: getModelSchemaRef(GarbageCollection) } },
      },
    },
  })
  async findById(@param.path.number('id') id: number): Promise<GarbageCollection> {
    return this.garbageCollectionRepository.findById(id);
  }

  @patch('/garbagecollection/{id}', {
    responses: {
      '204': {
        description: 'GarbageCollection PATCH success',
      },
    },
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(GarbageCollection, { partial: true }),
        },
      },
    })
    garbageCollection: GarbageCollection,
  ): Promise<void> {
    await this.garbageCollectionRepository.updateById(id, garbageCollection);
  }

  @put('/garbagecollection/{id}', {
    responses: {
      '204': {
        description: 'GarbageCollection PUT success',
      },
    },
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() garbageCollection: GarbageCollection,
  ): Promise<void> {
    await this.garbageCollectionRepository.replaceById(id, garbageCollection);
  }

  @del('/garbagecollection/{id}', {
    responses: {
      '204': {
        description: 'GarbageCollection DELETE success',
      },
    },
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.garbageCollectionRepository.deleteById(id);
  }
}
