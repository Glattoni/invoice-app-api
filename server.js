require('dotenv').config();
require('express-async-errors');

const express = require('express');
const app = express();
const errorHandlerMiddleware = require('./middleware/error-handler');
const notFoundMiddleware = require('./middleware/not-found');
const cors = require('cors');

//connectDB
const connectDB = require('./db/connect');

//routers
const invoicesRouter = require('./routes/invoices');

//middleware
app.use(cors());
app.use(express.json());

//routes
app.use('/api/v1/invoices', invoicesRouter);

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

app.get('/', (req, res) => {
  res.send('invoice api');
});

const port = process.env.PORT || 3000;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, console.log(`Server is listening on port ${port}...`));
  } catch (error) {
    console.log(error);
  }
};

start();
