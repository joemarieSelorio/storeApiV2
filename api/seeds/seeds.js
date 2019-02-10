require('app-module-path').addPath(require('app-root-path').toString());


const Supplies = require('api/models/Supplies');
const Ratings = require('api/models/Ratings');

const supplies = [
  {
    name: 'Nike SB Black',
    description: 'Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit...', // eslint-disable-line
    image: 'image1.jpeg',
    quantity: 100,
  },
  {
    name: 'Nike SB Blue',
    description: 'Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit...', // eslint-disable-line
    image: 'image2.jpeg',
    quantity: 100,
  },
  {
    name: 'Nike SB Green',
    description: 'Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit...', // eslint-disable-line
    image: 'image3.jpeg',
    quantity: 100,
  },
  {
    name: 'Nike SB Gray',
    description: 'Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit...', // eslint-disable-line
    image: 'image4.jpeg',
    quantity: 100,
  },
  {
    name: 'Nike SB White',
    description: 'Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit...', // eslint-disable-line
    image: 'image5.jpeg',
    quantity: 100,
  },
];

const seedDB = async ()=>{
  try {
    await Supplies.remove();
    await Ratings.remove();
    supplies.forEach(async (supply)=>{
      const seeds = await Supplies.create(supply);
      seeds.save();
    });
  } catch (e) {
    console.log({error: e});
  }
};

// eslint-disable-next-line eol-last
module.exports = seedDB;