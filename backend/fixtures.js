const mongoose = require('mongoose');
const {nanoid} = require('nanoid');

const config = require('./config');
const User = require('./models/User');
const Place = require('./models/Place');
const Rating = require('./models/Rating');

const run = async () => {
    await mongoose.connect(config.database, config.options);

    const collections = await mongoose.connection.db.listCollections().toArray();

    for (let coll of collections) {
        await mongoose.connection.db.dropCollection(coll.name);
    }

    const [admin, user1, user2] = await User.create({
        password: 'admin123',
        role: 'admin',
        token: nanoid(),
        username: 'admin123',
        fullName: 'Admin',
    }, {
        password: 'user123',
        role: 'user',
        token: nanoid(),
        fullName: 'User',
        username: 'user1'
    }, {
        password: 'user123',
        role: 'user',
        token: nanoid(),
        fullName: 'User2',
        username: 'user2'
    });

    const [place1, place2] = await Place.create(
        {
            title: 'Test',
            description: 'this is test1',
            userId: user1,
            mainPicture: "images2.jpeg",
            images: [],
            datetime: new Date()
        }, {
            title: 'Test',
            description: 'this is test1',
            userId: user2,
            mainPicture: "image1.jpeg",
            images: [],
            datetime: new Date()
        });

    const [rating1, rating2] = await Rating.create(
        {
            qualityToFood: 3,
            serviceQuality: 3,
            interior: 3,
            comment: "this very good place",
            userId: user1,
            placeId: place2,
            datetime: new Date()
        },
        {
            qualityToFood: 4,
            serviceQuality: 5,
            interior: 2,
            comment: "Very good!!!",
            userId: user2,
            placeId: place1,
            datetime: new Date()
        }
    );


    mongoose.connection.close();
};

run().catch(error => {
    mongoose.connection.close();

    throw error;
});