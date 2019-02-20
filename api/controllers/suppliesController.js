require('app-module-path').addPath(require('app-root-path').toString());
const Supplies = require('api/models/Supplies');
// const Ratings = require('api/models/Ratings');
const {map, pick} = require('lodash');
const {getAllSupplies, getSupplyById, getSupplyRatings, createNewSupply,
  getSupplyByName, createNewRating} =
   require('api/repositories/suppliesRepositories');
const {validSupply, validRating} = require('api/utilities/validator');
const HttpError = require('api/responses/HttpError');
const NotFoundError = require('api/responses/NotFoundError');
const HttpSuccess = require('api/responses/HttpSuccess');
/**
 *Get Supplies
 * @todo Retrive all Supplies in DB
 * @param {object} req  - Request to the Server
 * @param {object} res  - Response to the Server
 * @param {object} next - Next function to be executed
 */
async function getSupplies(req, res, next) {
  try {
    const supplies = await getAllSupplies();
    const suppliesSummary = map(supplies, (row)=> {
      return {
        id: row.id,
        data: {
          name: row.name,
          description: row.description,
          imageUrl: row.imageUrl,
          quantity: row.quantity,
        },
      };
    });
    res.locals.respObj = new HttpSuccess(200,
        `Successfully retrieve all Supplies`, suppliesSummary);
    return next();
  } catch (e) {
    return next(new HttpError(500, 9999, e.message));
  }
}
/**
 *Get Details
 * @todo Retrive details of specific supply item
 * @param {object} req  - Request to the Server
 * @param {object} res  - Response to the Server
 * @param {object} next - Next function to be executed
 */
async function getSpecificSupply(req, res, next) {
  try {
    const id = req.params.id;
    const supplyId = id;
    const supply = await getSupplyById(id);
    const ratings = await getSupplyRatings(id, supplyId);
    if (!supply) {
      return next(new NotFoundError('Supplies not found'));
    }
    res.locals.respObj = new HttpSuccess(200,
        `Successfully retrive details`, {
          details: pick(supply,
              ['id', 'name', 'description', 'imageUrl', 'quantity']),
          rating: map(ratings, (row)=>{
            return {rating: row.rating,
              user: row.user};
          }),
        });
    return next();
  } catch (e) {
    return next(new HttpError(500, 9999, e.message));
  }
}
/**
 * Add Supply
 * @todo add a supply item
 * @param {object} req  - Request to the Server
 * @param {object} res  - Response to the Server
 * @param {object} next - Next function to be executed
 */
async function addSupply(req, res, next) {
  try {
    const {name, description, imageUrl, quantity} = req.body;
    const existingSupply = await getSupplyByName(name);
    if (existingSupply) {
      return next(new HttpError(403, 9999,
          'Supply item is already in the inventory'));
    } else {
      if (validSupply(req.body)) {
        const newSupply = await createNewSupply(name,
            description, imageUrl, quantity);
        res.locals.respObj = new HttpSuccess(200,
            `Successfully added new supply`,
            {newSupply: pick(newSupply,
                ['id', 'name', 'description', 'imageUrl', 'quantity'])});
        return next();
      } else {
        return next(new HttpError(403, 9997, 'Invalid Supply details'));
      }
    }
  } catch (e) {
    return next(new HttpError(500, 9999, e.message));
  }
}
/**
 * Add supply ratings
 * @todo add ratings to a specific supply
 * @param {object} req  - Request to the Server
 * @param {object} res  - Response to the Server
 * @param {object} next - Next function to be executed
 */
async function addRatings(req, res, next) {
  try {
    const {id} = req.params;
    const selectedSupply = await getSupplyById(id);
    if (!selectedSupply) {
      return next(new NotFoundError('Supplies not found'));
    } else {
      if (validRating(req.body)) {
        const {user, rating} = req.body;
        const newRating = await createNewRating(user, rating, id);
        res.locals.respObj = new HttpSuccess(200,
            `Successfully added ratings`, {newRating: pick(newRating,
                ['id', 'user', 'rating', 'supplyId'])});
        return next();
      } else {
        return next(new HttpError(403, 9997,
            'Invalid rating details'));
      }
    }
  } catch (e) {
    return next(new HttpError(500, 9999,
        e.message));
  }
}

/**
 *Delete a supply
 * @todo delete a specific supply
 * @param {object} req  - Request to the Server
 * @param {object} res  - Response to the Server
 * @param {object} next - Next function to be executed
 */
async function deleteSupply(req, res, next) {
  try {
    const id = req.params.id;
    const deletedSupplies = await Supplies.findByIdAndRemove(id);
    if (!deletedSupplies) {
      return next(new NotFoundError('Supplies not found'));
    }
    res.locals.respObj = new HttpSuccess(200,
        `Successfully deleted ${deletedSupplies.name}`); // eslint-disable-line
    return next();
  } catch (e) {
    return next(new HttpError(500, 9999, 'Database error'));
  }
}

module.exports = {
  getSupplies,
  getSpecificSupply,
  addSupply,
  addRatings,
  deleteSupply,
};
