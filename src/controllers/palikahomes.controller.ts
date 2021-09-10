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
import {PalikaHomes} from '../models';
import {PalikaHomesRepository} from '../repositories';

export class PalikahomesController {
  constructor(
    @repository(PalikaHomesRepository)
    public palikaHomesRepository: PalikaHomesRepository,
  ) {}

  @post('/palikahomes', {
    responses: {
      '200': {
        description: 'PalikaHomes model instance',
        content: {'application/json': {schema: getModelSchemaRef(PalikaHomes)}},
      },
    },
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(PalikaHomes, {
            title: 'NewPalikaHomes',
            exclude: ['homeId'],
          }),
        },
      },
    })
    palikaHomes: Omit<PalikaHomes, 'homeId'>,
  ): Promise<PalikaHomes> {
    return this.palikaHomesRepository.create(palikaHomes);
  }

  @get('/palikahomes/count', {
    responses: {
      '200': {
        description: 'PalikaHomes model count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async count(
    @param.query.object('where', getWhereSchemaFor(PalikaHomes))
    where?: Where<PalikaHomes>,
  ): Promise<Count> {
    return this.palikaHomesRepository.count(where);
  }

  @get('/palikahomes', {
    responses: {
      '200': {
        description: 'Array of PalikaHomes model instances',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(PalikaHomes)},
          },
        },
      },
    },
  })
  async find(
    @param.query.object('filter', getFilterSchemaFor(PalikaHomes))
    filter?: Filter<PalikaHomes>,
  ) {
    return this.palikaHomesRepository.find(filter).then(
      (data: any) => {
        return data;
      },
      (error: any) => {
        return {
          status: 500,
          message: 'Failed to get the homes..' + error,
        };
      },
    );
  }

  @patch('/palikahomes', {
    responses: {
      '200': {
        description: 'PalikaHomes PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(PalikaHomes, {partial: true}),
        },
      },
    })
    palikaHomes: PalikaHomes,
    @param.query.object('where', getWhereSchemaFor(PalikaHomes))
    where?: Where<PalikaHomes>,
  ): Promise<Count> {
    return this.palikaHomesRepository.updateAll(palikaHomes, where);
  }

  @get('/palikahomes/{id}', {
    responses: {
      '200': {
        description: 'PalikaHomes model instance',
        content: {'application/json': {schema: getModelSchemaRef(PalikaHomes)}},
      },
    },
  })
  async findById(@param.path.number('id') id: number): Promise<PalikaHomes> {
    return this.palikaHomesRepository.findById(id);
  }

  @get('/palikahomes/byVehicle/{vno}', {
    responses: {
      '200': {
        description: 'PalikaHomes model instance',
        content: {'application/json': {schema: getModelSchemaRef(PalikaHomes)}},
      },
    },
  })
  async byVehicle(@param.path.string('vno') vno: string) {
    const query = "Select * from PalikaHomes where vehicleNo='" + vno + "'";
    return this.palikaHomesRepository.dataSource.execute(query).then((data: any) => {
      return data;
    });
  }

  @patch('/palikahomes/{id}', {
    responses: {
      '204': {
        description: 'PalikaHomes PATCH success',
      },
    },
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(PalikaHomes, {partial: true}),
        },
      },
    })
    palikaHomes: PalikaHomes,
  ): Promise<void> {
    await this.palikaHomesRepository.updateById(id, palikaHomes);
  }

  @put('/palikahomes/{id}', {
    responses: {
      '204': {
        description: 'PalikaHomes PUT success',
      },
    },
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() palikaHomes: PalikaHomes,
  ): Promise<void> {
    await this.palikaHomesRepository.replaceById(id, palikaHomes);
  }

  @del('/palikahomes/{id}', {
    responses: {
      '204': {
        description: 'PalikaHomes DELETE success',
      },
    },
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.palikaHomesRepository.deleteById(id);
  }
}
