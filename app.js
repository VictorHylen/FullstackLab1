
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const routes = require('./routes/routes');
dotenv.config();

const port = process.env.PORT || 3000;


// connect to DB
mongoose.connect(process.env.DB_CONNECT, { useUnifiedTopology: true, useNewUrlParser: true }, () => {
    console.log('We are offical connected to our Database');
});



// Middlewares
app.use(express.json());
app.use(express.static('public'));

// Route Middleware
app.use("/api", routes)



app.listen(port, () => {
    console.log('Server is up and ready to Rock´n Roll on port ' + port);
});