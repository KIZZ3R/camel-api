import request from 'supertest'

import app from '../../app'
import * as dao from './examples.dao.js'
import sequelize from '../../config/sequelize.js'
import { loadSeedData } from '../../../test/utils'
import * as helper from '../../helpers/object-helper.js'

beforeAll(async () => {
  await sequelize.sync({ force: true }) // Cria as tabelas no banco de dados de teste
  await loadSeedData('examples')
})

afterAll(async () => {
  await sequelize.drop() // Apaga as tabelas no banco de dados de teste
  await sequelize.close() // Fecha a conexão com o banco de dados de teste
})

describe('[POST] - /examples', () => {
  it('should return 201 and create a new example', async () => {
    const response = await request(app).post('/examples').send({
      field1: 'register 4',
      field2: 'register 4',
    })

    expect(response.status).toBe(201)
    expect(response.body).toHaveProperty('id')
  })

  it('should return 400 when invalid request body', async () => {
    const response = await request(app).post('/examples').send({
      any_value: 'invalid_value',
    })

    expect(response.status).toBe(400)
    expect(response.body).toHaveProperty('message', expect.any(String))
  })

  it('should return 409 when example already exists', async () => {
    const response = await request(app).post('/examples').send({
      field1: 'already_exists field1',
      field2: 'already_exists field2',
    })

    expect(response.status).toBe(409)
    expect(response.body).toHaveProperty('message', expect.any(String))
  })

  it('should return 500 when unexpected error ocurred', async () => {
    jest.spyOn(dao, 'insertExample').mockImplementationOnce(() => {
      throw new Error()
    })

    const response = await request(app).post('/examples').send({
      field1: 'field1',
      field2: 'field2',
    })

    expect(response.status).toBe(500)
    expect(response.body).toHaveProperty('message', expect.any(String))
  })
})

describe('[GET] - /examples', () => {
  const queryParams = {
    limit: 2,
    offset: 1,
    sortBy: 'field1',
    sortOrder: 'asc',
    search: ' Already ',
  }

  it('should return 200 without pagination query params and list all examples', async () => {
    const response = await request(app).get('/examples')

    expect(response.status).toBe(200)
    expect(Number(response.headers['x-count'])).toBeGreaterThan(1)
  })

  it('should return 200 with pagination query params and a list examples', async () => {
    const response = await request(app).get('/examples').query({
      limit: queryParams.limit,
      offset: queryParams.offset,
      sortBy: queryParams.sortBy,
      sortOrder: queryParams.sortOrder,
    })

    expect(response.status).toBe(200)
    expect(Number(response.headers['x-count'])).toBeGreaterThan(
      queryParams.limit,
    )
    expect(response.body.length).toBe(queryParams.limit)
    expect(response.body[0].field1).toBe('register 2 field1')
    expect(response.body[1].field1).toBe('register 3 field1')
  })

  it('should return 200 with search pagination query param and a list examples', async () => {
    const response = await request(app).get('/examples').query({
      search: queryParams.search,
    })

    expect(response.status).toBe(200)
    expect(Number(response.headers['x-count'])).toBe(1)
    expect(response.body[0].field1).toBe('already_exists field1')
  })

  it('should return 400 when invalid request query params', async () => {
    const response = await request(app).get('/examples').query({
      any_value: 'invalid_value',
    })

    expect(response.status).toBe(400)
    expect(response.body).toHaveProperty('message', expect.any(String))
  })

  it('should return 500 when unexpected error ocurred', async () => {
    jest.spyOn(dao, 'findAndCountExamples').mockImplementationOnce(() => {
      throw new Error()
    })

    const response = await request(app).get('/examples')

    expect(response.status).toBe(500)
    expect(response.body).toHaveProperty('message', expect.any(String))
  })
})

describe('[GET] - /examples/:exampleID', () => {
  const exampleID = 1

  it('should return 200 and a single example', async () => {
    const response = await request(app).get(`/examples/${exampleID}`)

    expect(response.status).toBe(200)

    expect(response.body.id).toBe(exampleID)
  })

  it('should return 400 when invalid param', async () => {
    const value = 'invalid_value'

    const response = await request(app).get(`/examples/${value}`)

    expect(response.status).toBe(400)
    expect(response.body).toHaveProperty('message', expect.any(String))
  })

  it('should return 404 when example does not exist', async () => {
    const response = await request(app).get(`/examples/${8129719872}`)

    expect(response.status).toBe(404)
    expect(response.body).toHaveProperty('message', expect.any(String))
  })

  it('should return 500 when unexpected error ocurred', async () => {
    jest.spyOn(helper, 'isNullOrUndefined').mockImplementationOnce(() => {
      throw new Error()
    })

    const response = await request(app).get(`/examples/${exampleID}`)

    expect(response.status).toBe(500)
    expect(response.body).toHaveProperty('message', expect.any(String))
  })
})

describe('[PUT] - /examples/:exampleID', () => {
  const requestBody = {
    field1: 'register 3 field1 UPDATED',
    field2: 'register 3 field2 UPDATED',
  }

  const exampleID = 3

  it('should return 200 and update a single example', async () => {
    const response = await request(app)
      .put(`/examples/${exampleID}`)
      .send(requestBody)

    expect(response.status).toBe(200)
    expect(response.body.id).toBe(exampleID)
    expect(response.body.field1).toBe(requestBody.field1)
    expect(response.body.field2).toBe(requestBody.field2)
  })

  it('should return 400 when invalid request body', async () => {
    const response = await request(app).put(`/examples/${exampleID}`).send({
      any_value: 'invalid_value',
    })

    expect(response.status).toBe(400)
    expect(response.body).toHaveProperty('message', expect.any(String))
  })

  it('should return 404 when example does not exist', async () => {
    const response = await request(app)
      .put(`/examples/${8129719872}`)
      .send(requestBody)

    expect(response.status).toBe(404)
    expect(response.body).toHaveProperty('message', expect.any(String))
  })

  it('should return 409 when example already exists', async () => {
    const response = await request(app)
      .put(`/examples/${exampleID}`)
      .send({
        ...requestBody,
        field1: 'already_exists field1',
      })

    expect(response.status).toBe(409)
    expect(response.body).toHaveProperty('message', expect.any(String))
  })

  it('should return 500 when unexpected error ocurred', async () => {
    jest.spyOn(dao, 'updateExample').mockImplementationOnce(() => {
      throw new Error()
    })

    const response = await request(app)
      .put(`/examples/${exampleID}`)
      .send({
        ...requestBody,
        field1: 'any value',
      })

    expect(response.status).toBe(500)
    expect(response.body).toHaveProperty('message', expect.any(String))
  })
})

describe('[DELETE] - /examples/:exampleID', () => {
  const exampleID = 1

  it('should return 204 and delete a single example', async () => {
    const response = await request(app).delete(`/examples/${exampleID}`)

    expect(response.status).toBe(204)
  })

  it('should return 400 when invalid param', async () => {
    const value = 'invalid_value'

    const response = await request(app).delete(`/examples/${value}`)

    expect(response.status).toBe(400)
    expect(response.body).toHaveProperty('message', expect.any(String))
  })

  it('should return 404 when example does not exist', async () => {
    const response = await request(app).delete(`/examples/${8129719872}`)

    expect(response.status).toBe(404)
    expect(response.body).toHaveProperty('message', expect.any(String))
  })

  it('should return 500 when unexpected error ocurred', async () => {
    jest.spyOn(dao, 'deleteExample').mockImplementationOnce(() => {
      throw new Error()
    })

    const response = await request(app).delete(`/examples/${exampleID + 1}`)

    expect(response.status).toBe(500)
    expect(response.body).toHaveProperty('message', expect.any(String))
  })
})
