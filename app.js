require('app-module-path').addPath(require('app-root-path').toString());
require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const HttpError = require('api/responses/HttpError');
// const seedDB = require('api/seeds/Seeds');
const app = express();

// seedDB();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

mongoose.connect(process.env.CONNECTION_STRING, {useNewUrlParser: true});

app.use('/api/supplies/'
    , require('api/routers/SuppliesRouter'), _processResponse);

/**
 * Uniform JSON response object sending
 * @param {object} req - The express request object
 * @param {object} res - The express response object
 * @return {function} Function call to send response to user
 */
function _processResponse(req, res) {
  return res.status(res.locals.respObj.status).json(res.locals.respObj);
}

app.use((error, req, res, next) => {
  if (!(error instanceof HttpError)) {
    const errorObj = new HttpError();
    return res.status(errorObj.status).json(errorObj);
  } else {
    return res.status(error.status).json(error);
  }
});

app.listen(process.env.PORT || 8080, async ()=>{
  console.log(`Listening to port ${process.env.PORT}`);
});


