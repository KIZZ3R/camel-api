import fs from 'fs'
import path from 'path'

import sequelize from '../../src/config/sequelize'

async function loadSeedData() {
  const exampleSeedFilePath = path.resolve(
    __dirname,
    '../seeders/examples.json',
  ) // Caminho absoluto para o arquivo JSON
  const exampleData = JSON.parse(fs.readFileSync(exampleSeedFilePath, 'utf8'))

  // Insira os dados na tabela de exemplos
  await sequelize.models.examples.bulkCreate(exampleData)
}

export { loadSeedData }
