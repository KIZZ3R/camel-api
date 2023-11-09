import { findUserByEmail } from './users.dao.js'
import sequelize from '../../config/sequelize.js'
import { loadSeedData } from '../../../test/utils/index.js'

beforeAll(async () => {
  await sequelize.sync({ force: true }) // Cria as tabelas no banco de dados de teste
  await loadSeedData('users')
})

afterAll(async () => {
  await sequelize.drop() // Apaga as tabelas no banco de dados de teste
  await sequelize.close() // Fecha a conexão com o banco de dados de teste
})

describe('[DAO] findUserByEmail', () => {
  it('should return user when user exists', async () => {
    const email = 'joao.silva@example.com'
    const response = await findUserByEmail(email)

    expect(response).toBeDefined()
    expect(response.email).toBe(email)
  })

  it('should return undefined when user does not exist', async () => {
    const email = 'invalid_email'
    const response = await findUserByEmail(email)

    expect(response).toBeNull()
  })
})
