import fs from 'fs'
import path from 'path'

import sequelize from '../../src/config/sequelize'

async function loadSeedData(tableName) {
  const seedFilePath = path.resolve(__dirname, `../seeders/${tableName}.json`)
  const seedData = JSON.parse(fs.readFileSync(seedFilePath, 'utf8'))

  // Inserir os dados na tabela correspondente
  await sequelize.models[tableName].bulkCreate(seedData)
}

export { loadSeedData }
