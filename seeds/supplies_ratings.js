/* eslint-disable linebreak-style */
require('app-module-path').addPath(require('app-root-path').toString());

const ratings = require('data/ratingData');
const supplies = require('data/supplyData');

exports.seed = function(knex, Promise) {
  return knex('ratings').del()
      .then(() => {
        return knex('supplies').del();
      })
      .then(() => {
        return knex('supplies').insert(supplies);
      })
      .then(() => {
        const ratingPromise = [];
        ratings.forEach((rating) => {
          const supply = rating.supply;
          ratingPromise.push(createRating(knex, rating, supply));
        });
        return Promise.all(ratingPromise);
      });
};

const createRating = (knex, rating, supply) => {
  return knex('supplies').where('name', supply).first()
      .then((supplyRecord) => {
        return knex('ratings').insert({
          user: rating.user,
          rating: rating.rating,
          supplyId: supplyRecord.id,
        });
      });
};
