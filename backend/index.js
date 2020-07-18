const express = require('express');
const app = express();
const port = 8080;

const cors = require('cors');
const mongoose = require('mongoose');

const config = require('./config');
const users = require('./router/users');
const places = require('./router/places');
const ratings = require('./router/ratings');


app.use(cors());
app.use(express.json());
app.use(express.static('public'));

const run = async () =>{
    await mongoose.connect(config.database, config.options);

    app.use('/users', users);
    app.use('/places', places);
    app.use('/ratings', ratings);

    app.listen(port, () => {
        console.log(`Server start in PORT: ${port}`)
    })
};

run().catch(e => console.error(e));