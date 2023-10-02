import './dotenv.js'

import { Sequelize } from 'sequelize'

const sequelize = new Sequelize({
  database: process.env.DB_NAME,
  username: process.env.DB_USER || 'postgres',
  password: process.env.DB_PASSWORD || 123456,
  host: process.env.DB_HOST,
  dialect: process.env.DB_DIALECT || 'postgres',
  storage: process.env.NODE_ENV === 'test' ? ':memory:' : undefined,
  logging: false,
  define: {
    paranoid: true, // Habilita a deleção lógica em todos os modelos
    timestamps: true, // Habilita a criação automática de timestamps (createdAt, updatedAt)
    underscored: true, // Convenção para nomes de colunas usando snake_case
  },
})

export default sequelize
