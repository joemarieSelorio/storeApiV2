require('app-module-path').addPath(require('app-root-path').toString());

const Supplies = require('api/models/Supplies');
const Ratings = require('api/models/Ratings');
const {map} = require('lodash');
const {getAllSupplies} = require('api/repositories/suppliesRepositories');
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
          imageUrl: row.imageURL,
          quantity: row.quantity,
        },
        status: row.status,
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
async function getSupplyById(req, res, next) {
  try {
    const id = req.params.id;
    const selectedSupply = await Supplies.findById(id).populate('ratings');
    if (!selectedSupply) {
      return next(new NotFoundError('Supplies not found'));
    }
    res.locals.respObj = new HttpSuccess(200,
      `Successfully retrive details of ${selectedSupply.name}`, selectedSupply._doc); // eslint-disable-line
    return next();
  } catch (e) {
    return next(new HttpError(500, 9999, 'Database error'));
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
    const foundSupply = await Supplies.findOne({name: req.body.name});
    if (foundSupply) {
      return next(new HttpError(403, 9999,
          'Supply item is already in the inventory'));
    } else {
      if (validSupply(req.body)) {
        const supplyDetails = {
          name: req.body.name,
          description: req.body.description,
          imageURL: req.body.image,
          quantity: req.body.quantity,
        };
        const newSupply = await Supplies.create(supplyDetails);
        res.locals.respObj = new HttpSuccess(200,
            `Successfully added ${newSupply.name}`, newSupply._doc);
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
    const id = req.params.id;
    const selectedSupply = await Supplies.findById(id);
    if (!selectedSupply) {
      return next(new NotFoundError('Supplies not found'));
    } else {
      if (validRating(req.body)) {
        const ratingDetails = {
          user: req.body.user,
          rating: req.body.rating,
        };
        const rating = await Ratings.create(ratingDetails);
        await selectedSupply.ratings.push(rating);
        await selectedSupply.save();
        res.locals.respObj = new HttpSuccess(200,
            `Successfully added ratings to ${selectedSupply.name}`,
            selectedSupply._doc);
        return next();
      } else {
        return next(new HttpError(403, 9997,
            'Invalid rating details'));
      }
    }
  } catch (e) {
    return next(new HttpError(500, 9999,
        'Database error'));
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
  getSupplyById,
  addSupply,
  addRatings,
  deleteSupply,
};
