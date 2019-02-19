require('app-module-path').addPath(require('app-root-path').toString());

const express = require('express');
const router = new express.Router();
const {getSupplies, getSpecificSupply, addSupply,
  addRatings, deleteSupply} = require(
    'api/controllers/SuppliesController');

router.get('/', getSupplies);

router.get('/:id', getSpecificSupply);

router.post('/', addSupply);

router.post('/ratings/:id', addRatings);

router.delete('/:id', deleteSupply);

module.exports = router;


