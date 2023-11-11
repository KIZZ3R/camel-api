import usersModel from './users.model.js'

const findUserByEmail = async email => {
  return await usersModel.findOne({
    where: {
      email,
      deletedAt: null,
    },
  })
}

export { findUserByEmail }
