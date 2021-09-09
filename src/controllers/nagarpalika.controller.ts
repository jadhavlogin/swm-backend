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
import {NagarPalika} from '../models';
import {NagarPalikaRepository} from '../repositories';

export class NagarpalikaController {
  constructor(
    @repository(NagarPalikaRepository)
    public nagarPalikaRepository : NagarPalikaRepository,
  ) {}

  @post('/nagarpalikas', {
    responses: {
      '200': {
        description: 'NagarPalika model instance',
        content: {'application/json': {schema: getModelSchemaRef(NagarPalika)}},
      },
    },
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(NagarPalika, {
            title: 'NewNagarPalika',
            exclude: ['palikaId'],
          }),
        },
      },
    })
    nagarPalika: Omit<NagarPalika, 'palikaId'>,
  ): Promise<NagarPalika> {
    return this.nagarPalikaRepository.create(nagarPalika);
  }

  @get('/nagarpalikas/count', {
    responses: {
      '200': {
        description: 'NagarPalika model count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async count(
    @param.query.object('where', getWhereSchemaFor(NagarPalika)) where?: Where<NagarPalika>,
  ): Promise<Count> {
    return this.nagarPalikaRepository.count(where);
  }

  @get('/nagarpalikas', {
    responses: {
      '200': {
        description: 'Array of NagarPalika model instances',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(NagarPalika)},
          },
        },
      },
    },
  })
  async find(
    @param.query.object('filter', getFilterSchemaFor(NagarPalika)) filter?: Filter<NagarPalika>,
  ): Promise<NagarPalika[]> {
    return this.nagarPalikaRepository.find(filter);
  }

  @patch('/nagarpalikas', {
    responses: {
      '200': {
        description: 'NagarPalika PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(NagarPalika, {partial: true}),
        },
      },
    })
    nagarPalika: NagarPalika,
    @param.query.object('where', getWhereSchemaFor(NagarPalika)) where?: Where<NagarPalika>,
  ): Promise<Count> {
    return this.nagarPalikaRepository.updateAll(nagarPalika, where);
  }

  @get('/nagarpalikas/{id}', {
    responses: {
      '200': {
        description: 'NagarPalika model instance',
        content: {'application/json': {schema: getModelSchemaRef(NagarPalika)}},
      },
    },
  })
  async findById(@param.path.number('id') id: number): Promise<NagarPalika> {
    return this.nagarPalikaRepository.findById(id);
  }

  @patch('/nagarpalikas/{id}', {
    responses: {
      '204': {
        description: 'NagarPalika PATCH success',
      },
    },
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(NagarPalika, {partial: true}),
        },
      },
    })
    nagarPalika: NagarPalika,
  ): Promise<void> {
    await this.nagarPalikaRepository.updateById(id, nagarPalika);
  }

  @put('/nagarpalikas/{id}', {
    responses: {
      '204': {
        description: 'NagarPalika PUT success',
      },
    },
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() nagarPalika: NagarPalika,
  ): Promise<void> {
    await this.nagarPalikaRepository.replaceById(id, nagarPalika);
  }

  @del('/nagarpalikas/{id}', {
    responses: {
      '204': {
        description: 'NagarPalika DELETE success',
      },
    },
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.nagarPalikaRepository.deleteById(id);
  }
}
