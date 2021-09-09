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
import {Ward} from '../models';
import {WardRepository} from '../repositories';

export class WardController {
  constructor(
    @repository(WardRepository)
    public wardRepository : WardRepository,
  ) {}

  @post('/wards', {
    responses: {
      '200': {
        description: 'Ward model instance',
        content: {'application/json': {schema: getModelSchemaRef(Ward)}},
      },
    },
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Ward, {
            title: 'NewWard',
            exclude: ['wardId'],
          }),
        },
      },
    })
    ward: Omit<Ward, 'wardId'>,
  ): Promise<Ward> {
    return this.wardRepository.create(ward);
  }

  @get('/wards/count', {
    responses: {
      '200': {
        description: 'Ward model count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async count(
    @param.query.object('where', getWhereSchemaFor(Ward)) where?: Where<Ward>,
  ): Promise<Count> {
    return this.wardRepository.count(where);
  }

  @get('/wards', {
    responses: {
      '200': {
        description: 'Array of Ward model instances',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Ward)},
          },
        },
      },
    },
  })
  async find(
    @param.query.object('filter', getFilterSchemaFor(Ward)) filter?: Filter<Ward>,
  ): Promise<Ward[]> {
    return this.wardRepository.find(filter);
  }

  @patch('/wards', {
    responses: {
      '200': {
        description: 'Ward PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Ward, {partial: true}),
        },
      },
    })
    ward: Ward,
    @param.query.object('where', getWhereSchemaFor(Ward)) where?: Where<Ward>,
  ): Promise<Count> {
    return this.wardRepository.updateAll(ward, where);
  }

  @get('/wards/{id}', {
    responses: {
      '200': {
        description: 'Ward model instance',
        content: {'application/json': {schema: getModelSchemaRef(Ward)}},
      },
    },
  })
  async findById(@param.path.number('id') id: number): Promise<Ward> {
    return this.wardRepository.findById(id);
  }

  @patch('/wards/{id}', {
    responses: {
      '204': {
        description: 'Ward PATCH success',
      },
    },
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Ward, {partial: true}),
        },
      },
    })
    ward: Ward,
  ): Promise<void> {
    await this.wardRepository.updateById(id, ward);
  }

  @put('/wards/{id}', {
    responses: {
      '204': {
        description: 'Ward PUT success',
      },
    },
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() ward: Ward,
  ): Promise<void> {
    await this.wardRepository.replaceById(id, ward);
  }

  @del('/wards/{id}', {
    responses: {
      '204': {
        description: 'Ward DELETE success',
      },
    },
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.wardRepository.deleteById(id);
  }
}
