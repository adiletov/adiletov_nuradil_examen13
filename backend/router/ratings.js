const router = require('express').Router();
const auth = require('../middleware/auth');
const Rating = require('../models/Rating');


const calcRatings = (ratings, value) => {
    let resRatings = ratings.reduce((acc, el) => {
        return acc += el[value]
    }, 0);
    let res = (resRatings / ratings.length).toFixed(1);
    return Number(res)
};

router.post('/', auth, async (req, res) => {
    const {qualityToFood, serviceQuality, interior, comment, placeId} = req.body;

    try {
        let ratingData = {
            qualityToFood,
            serviceQuality,
            interior,
            comment,
            userId: req.user._id,
            placeId,
            datetime: new Date()
        };

        const rating = new Rating(ratingData);

        await rating.save();
        res.send({message: 'Rating or comment success'})
    } catch (e) {
        res.status(401).send(e)
    }
});

router.get('/:id', async (req, res) => {
    const ratings = await Rating.find({placeId: req.params.id}).populate('userId');
    const ratingPlace = {
        qualityToFood: 0,
        serviceQuality: 0,
        interior: 0,
        comments: [],
        datetime: ''
    };
    ratingPlace.qualityToFood = calcRatings(ratings, 'qualityToFood');
    ratingPlace.serviceQuality = calcRatings(ratings, 'serviceQuality');
    ratingPlace.interior = calcRatings(ratings, 'interior');

    ratings.map(el => ratingPlace.comments.push({
        fullName: el.userId.fullName,
        comment: el.comment, datetime: el.datetime,
        qualityToFood: el.qualityToFood,
        serviceQuality: el.serviceQuality,
        interior: el.interior,
        id: el._id
    }));
    ratingPlace.comments.reverse();
    res.send(ratingPlace)
});

router.delete('/remove/:id', auth, async (req, res) => {
    if (req.user.role !== 'admin') {
        return res.status(401).send({error: 'У вас нет дуступа '})
    }

    await Rating.deleteOne({_id: req.params.id});
    res.send({message: 'Remove comment!!!'})
});


module.exports = router;