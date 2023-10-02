import { Sequelize } from 'sequelize'

import examplesModel from './examples.model.js'

import { isDefined } from '../../helpers/object-helper.js'
import { searchAttributeString } from '../../helpers/query-helper.js'

const insertExample = async data => {
  return await examplesModel.create(data)
}

const findAndCountExamples = async params => {
  const { limit, offset, sortBy, sortOrder, filters, search } = params

  const options = {
    where: {
      deletedAt: null,
      ...(isDefined(search) && {
        [Sequelize.Op.or]: [
          {
            field1: {
              [Sequelize.Op.iLike]: `%${searchAttributeString(search)}%`,
            },
          },
          {
            field2: {
              [Sequelize.Op.iLike]: `%${searchAttributeString(search)}%`,
            },
          },
        ],
      }),
      ...filters,
    },
    limit: parseInt(limit),
    offset: parseInt(offset),
    order: [[sortBy, sortOrder]],
  }

  const result = await examplesModel.findAndCountAll(options)

  return {
    count: result.count,
    data: result.rows,
  }
}

const findExampleByID = async exampleID => {
  return await examplesModel.findOne({
    where: {
      id: exampleID,
      deletedAt: null,
    },
  })
}

const findExampleByField1 = async field1 => {
  return await examplesModel.findOne({
    where: {
      field1,
      deletedAt: null,
    },
  })
}

const updateExample = async (exampleID, data) => {
  await examplesModel.update(data, {
    where: {
      id: exampleID,
      deletedAt: null,
    },
  })

  return await findExampleByID(exampleID)
}

const deleteExample = async exampleID => {
  return await examplesModel.destroy({
    where: {
      id: exampleID,
      deletedAt: null,
    },
  })
}

export {
  insertExample,
  findAndCountExamples,
  findExampleByID,
  findExampleByField1,
  updateExample,
  deleteExample,
}
