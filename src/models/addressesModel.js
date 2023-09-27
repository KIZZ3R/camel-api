import { DataTypes } from 'sequelize'

import sequelize from '../config/sequelize.js'

const addressesModel = sequelize.define('endereco', {
  cep: {
    type: DataTypes.STRING(8),
    required: true,
    allowNull: false,
  },
  street: {
    type: DataTypes.STRING(100),
    required: true,
    allowNull: false,
  },
  neighborhood: {
    type: DataTypes.STRING(100),
    required: true,
    allowNull: false,
  },
  number: {
    type: DataTypes.INTEGER,
    required: true,
    allowNull: false,
  },
  complement: {
    type: DataTypes.STRING(100),
  },
  city: {
    type: DataTypes.STRING(100),
    required: true,
    allowNull: false,
  },
  uf: {
    type: DataTypes.CHAR(2),
    required: true,
    allowNull: false,
  },
})

export default addressesModel
