import request from 'supertest'

import app from '../../app'
import sequelize from '../../config/sequelize.js'
import * as usersDao from '../users/users.dao.js'
import { loadSeedData } from '../../../test/utils'

beforeAll(async () => {
  await sequelize.sync({ force: true }) // Cria as tabelas no banco de dados de teste
  await loadSeedData('users')
})

afterAll(async () => {
  await sequelize.drop() // Apaga as tabelas no banco de dados de teste
  await sequelize.close() // Fecha a conexão com o banco de dados de teste
})

describe('[POST] - /sessions', () => {
  it('should return 201 and create a new session', async () => {
    const response = await request(app).post('/sessions').send({
      email: 'joao.silva@example.com',
      password: 'senha123',
    })

    expect(response.status).toBe(201)
    expect(response.body).toHaveProperty('token')
    expect(response.body).toHaveProperty('user')
  })

  it('should return 400 when invalid request body', async () => {
    const response = await request(app).post('/sessions').send({
      any_value: 'invalid_value',
    })

    expect(response.status).toBe(400)
    expect(response.body).toHaveProperty('message', expect.any(String))
  })

  it('should return 404 when user does not exist', async () => {
    const response = await request(app).post('/sessions').send({
      email: 'nobody@example.com',
      password: 'senha123',
    })

    expect(response.status).toBe(404)
    expect(response.body).toHaveProperty('message', expect.any(String))
  })

  it('should return 500 when unexpected error ocurred', async () => {
    jest.spyOn(usersDao, 'findUserByEmail').mockImplementationOnce(() => {
      throw new Error()
    })

    const response = await request(app).post('/sessions').send({
      email: 'joao.silva@example.com',
      password: 'senha123',
    })

    expect(response.status).toBe(500)
    expect(response.body).toHaveProperty('message', expect.any(String))
  })
})
