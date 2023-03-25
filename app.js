require('dotenv').config();
require('express-async-errors');

//security
//express-rate-limiter
const ratelimiter = require ('express-rate-limit')
//cors
const cors = require ('cors')
//xss-clean
const xss = require ('xss-clean')
//helmet
const helmet = require ('helmet')


const express = require('express');
const app = express();

// controller
const stripePayment = require('./controllers/stripeController')
// error handler
const notFoundMiddleware = require('./middleware/not-found');
const errorHandlerMiddleware = require('./middleware/error-handler');

app.use(ratelimiter({
  WindowsMs: 60 * 15 * 1000,
  rate : 100
 
}))
app.use(cors())
app.use(helmet())
app.use(xss())

app.use(express.json());
app.use(express.static('./public'));

// stripe
app.post('/stripe',stripePayment)
app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 3000;

const start = async () => {
  try {
    app.listen(port, () =>
      console.log(`Server is listening on port ${port}...`)
    );
  } catch (error) {
    console.log(error);
  }
};

start();
