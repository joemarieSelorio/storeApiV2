require('app-module-path').addPath(require('app-root-path').toString());
require('dotenv').config();

const express = require('express');
const {createConnection} = require('mysql');
const bodyParser = require('body-parser');
const HttpError = require('api/responses/HttpError');
const app = express();

const connection = createConnection({
  host: 'localhost',
  user: 'root',
  password: '1234',
  database: 'suppliesdb',
});

connection.connect((err)=>{
  if (err) {
    // eslint-disable-next-line no-console
    console.log(err);
    return;
  }
  // eslint-disable-next-line no-console
  console.log('Mysql Initialized');
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

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
  // eslint-disable-next-line no-console
  console.log(`Listening to port ${process.env.PORT}`);
});
