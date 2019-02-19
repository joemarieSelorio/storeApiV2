
require('app-module-path').addPath(require('app-root-path').toString());

const MysqlService = require('api/services/mysqlService');

const service = new MysqlService();

const createNewSupply = async (name, description, imageUrl, quantity) => {
  const newSupply = {
    name,
    description,
    imageUrl,
    quantity,
  };
  try {
    return await service.insertToTable('supplies', newSupply);
  } catch (error) {
    throw new Error(error);
  }
};

const createNewRating = async (user, rating, supplyId) => {
  const newRating = {
    user,
    rating,
    supplyId,
  };
  try {
    return await service.insertToTable('ratings', newRating);
  } catch (error) {
    throw new Error(error);
  }
};

const getAllSupplies = async () => {
  const fields = ['id', 'name', 'description', 'imageUrl', 'quantity'];
  try {
    return await service.getTableContents('supplies', fields);
  } catch (error) {
    throw new Error(error);
  }
};

const getSupplyById = async (id)=> {
  const fields = ['name'];
  try {
    return await service.getTableRow(id, 'supplies', fields);
  } catch (error) {
    throw new Error(error);
  }
};

const getSupplyByName = async (name)=> {
  const fields = ['description', 'imageUrl', 'quantity'];
  try {
    return await service.getTableRowByName(name, 'supplies', fields);
  } catch (error) {
    throw new Error(error);
  }
};

module.exports = {
  createNewSupply,
  createNewRating,
  getAllSupplies,
  getSupplyById,
  getSupplyByName,
};
