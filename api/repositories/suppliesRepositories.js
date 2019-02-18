
require('app-module-path').addPath(require('app-root-path').toString());

const MysqlService = require('api/services/mysqlService');

const service = new MysqlService();

const createNewSupply = async (name, description, imageUrl, quantity) => {
  try {
    return await service.insertIntoTable(
        'supplies', {
          name, description, imageUrl, quantity,
        },
    );
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

module.exports = {
  createNewSupply,
  getAllSupplies,
};
