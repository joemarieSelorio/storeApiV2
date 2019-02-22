
require('app-module-path').addPath(require('app-root-path').toString());
require('dotenv').config();

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

const getSupplyRatings = async (id, supplyId)=> {
  try {
    return await service.innerJoinTable('supplies', 'ratings',
        id, supplyId);
  } catch (error) {
    throw new Error(error);
  }
};

const getSupplyById = async (id)=> {
  // try to specify fields to be retrieved when using inner join
  try {
    const fields = ['name', 'description', 'imageUrl', 'quantity'];
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

const deleteSupplyById = async (id)=> {
  try {
    return await service.deleteRow('supplies', id);
  } catch (error) {
    throw new Error(error.message);
  }
};

const deleteRating = async (supplyId)=> {
  try {
    return await service.deleteRow('ratings', supplyId);
  } catch (error) {
    throw new Error(error.message);
  }
};

module.exports = {
  createNewSupply,
  createNewRating,
  getAllSupplies,
  getSupplyRatings,
  getSupplyById,
  getSupplyByName,
  deleteSupplyById,
  deleteRating,
};
