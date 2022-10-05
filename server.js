const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const connectDB = require('./config/db');
const errorHandler = require('./middlewares/errorHandler');

// import routes
const bootcamps = require('./routes/bootcampsrout');

// load env
dotenv.config({path:'./config/config.env'});
// connect with db
connectDB();

const app = express();

//body parser
app.use(express.json());

app.use(morgan('dev'));
//Mount routes
app.use('/api/v1/bootcamps',bootcamps);

app.use(errorHandler);

const PORT = process.env.PORT;

app.listen(PORT,()=>{console.log(`Server is running on port ${PORT}`)});









