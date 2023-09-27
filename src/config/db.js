import sequelize from './sequelize.js'

const envIsDevelopment = process.env.NODE_ENV === 'development'

// Models

import usersModel from '../models/usersModel.js'
import addressesModel from '../models/addressesModel.js'

// RELATIONSHIPS

// One User has One Address
usersModel.hasOne(addressesModel, {
  foreignKey: 'id_cliente',
  onUpdate: 'CASCADE',
  onDelete: 'CASCADE',
})
addressesModel.belongsTo(usersModel, {
  foreignKey: 'id_cliente',
  onUpdate: 'CASCADE',
  onDelete: 'CASCADE',
})

async function connectToDatabase() {
  try {
    sequelize.authenticate()
    sequelize.sync({ force: envIsDevelopment })
    console.log('✅ Database connected!')
  } catch (error) {
    console.log('❌ Database not connected!')
    console.log(error)
  }
}

connectToDatabase()
