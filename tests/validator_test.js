require('app-module-path').addPath(require('app-root-path').toString());


const {describe} = require('mocha');
const joi = require('joi');
const {expect} = require('chai');
const {createSchema, validate, validSupply
  , validRating} = require('api/utilities/validator');

describe('#Validator', ()=>{
  describe('#createSchema', ()=>{
    it('Should be able to create a schema for validation', ()=>{
      const schema = createSchema({
        name: joi.string().required(),
        image: joi.string().required(),
        quantity: joi.number().required(),
      });
      const createdSchema = joi.object().keys({
        name: joi.string().required(),
        image: joi.string().required(),
        quantity: joi.number().required(),
      });
      expect(schema).to.deep.equal(createdSchema);
    });
  });
  describe('#validate', ()=>{
    it('It should validate', ()=>{
      const object = {
        name: 'Nike AirBnB',
        image: 'Image23.jpeg',
        quantity: 200,
      };
      const schema = createSchema({
        name: joi.string().required(),
        image: joi.string().required(),
        quantity: joi.number().required(),
      });
      const result = validate(object, schema);
      expect(result).to.true;
    });
  });
  describe('#validSupplyRequest', ()=>{
    it('Should return false if name of supply is missing', ()=>{
      const object ={
        image: 'Image1.jpeg',
        quantity: 200,
      };
      const result = validSupply(object);
      expect(result).to.false;
    });
    it('Should return false if image url of supply is missing', ()=>{
      const object = {
        name: 'Item1',
        quantity: 200,
      };
      const result = validSupply(object);
      expect(result).to.false;
    });
    it('Should return false if quantity of supply is missing', ()=>{
      const object = {
        name: 'item1',
        image: 'Image1.jpeg',
      };
      const result = validSupply(object);
      expect(result).to.false;
    });
    it('Should return false if quantity is lower or equal to 0', ()=>{
      const object ={
        name: 'Item1',
        image: 'Image1.jpeg',
        quantity: 0,
      };
      const result = validSupply(object);
      expect(result).to.false;
    });
    it('Should return false if quantity is higher that 500', ()=>{
      const object ={
        name: 'Item1',
        image: 'Image1.jpeg',
        quantity: 1000,
      };
      const result = validSupply(object);
      expect(result).to.false;
    });
  });
  describe('#validRatingRequest', ()=>{
    it('Should return false if user is missing', ()=>{
      const object = {
        rating: 5,
      };
      const result = validRating(object);
      expect(result).to.false;
    });
    it('Should return false if rating is missing', ()=>{
      const object = {
        rating: 5,
      };
      const result = validRating(object);
      expect(result).to.false;
    });
    it('Should return false if rating is less than or equal to 0', ()=>{
      const object = {
        rating: 0,
      };
      const result = validRating(object);
      expect(result).to.false;
    });
    it('Should return false if rating is greater than 5', ()=>{
      const object = {
        rating: 10,
      };
      const result = validRating(object);
      expect(result).to.false;
    });
  });
});

