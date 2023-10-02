import { DataTypes } from 'sequelize'

import sequelize from '../../config/sequelize.js'

const examplesModel = sequelize.define('examples', {
  field1: {
    type: DataTypes.STRING(100),
    required: true,
    allowNull: false,
    unique: true,
  },
  field2: {
    type: DataTypes.STRING(100),
    required: true,
    allowNull: false,
  },
})

export default examplesModel
