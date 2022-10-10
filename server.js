const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const fileUpload = require('express-fileupload');
const path = require('path');
const cookieParser = require('cookie-parser');
const connectDB = require('./config/db');
const errorHandler = require('./middlewares/errorHandler');

// import routes
const bootcamps = require('./routes/bootcampRout');
const courses = require('./routes/courseRout');
const users = require('./routes/userRoute');

// load env
dotenv.config({path:'./config/config.env'});
// connect with db
connectDB();

const app = express();

//body parser
app.use(express.json());

//Cookie parser
app.use(cookieParser());

app.use(morgan('dev'));

//File upload
app.use(fileUpload());
//Set static folder
app.use(express.static(path.join(__dirname,'pictures')));
//Mount routes
app.use('/api/v1/bootcamps',bootcamps);
app.use('/api/v1/courses',courses);
app.use('/api/v1/auth',users);

app.use(errorHandler);

const PORT = process.env.PORT;

app.listen(PORT,()=>{console.log(`Server is running on port ${PORT}`)});









