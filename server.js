const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const connectDB = require('./config/db');

// import routes
const bootcamps = require('./routes/bootcamps');

// load env
dotenv.config({path:'./config/config.env'});
// connect with db
connectDB();

const app = express();

app.use(morgan('dev'))
//Mount routes
app.use('/api/v1/bootcamps',bootcamps);

const PORT = process.env.PORT;

app.listen(PORT,()=>{console.log(`Server is running on port ${PORT}`)});









