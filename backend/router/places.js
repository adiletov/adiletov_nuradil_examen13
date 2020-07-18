const path = require('path');
const router = require('express').Router();
const auth = require('../middleware/auth');
const multer = require('multer');
const {nanoid} = require('nanoid');

const config = require('../config');
const Place = require('../models/Place');
const Rating = require('../models/Rating');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, config.uploadPath)
    },
    filename: (req, file, cb) => {
        cb(null, nanoid() + path.extname(file.originalname))
    }
});

const upload = multer({storage});

router.post('/', auth, upload.single('mainPicture'), async (req, res) => {
    const {title, description, checkbox} = req.body;
    if (!checkbox) {
        return res.status(401).send({error: 'Примите условие соглашения!!!'})
    }

    if (!req.file) {
        return res.status(401).send({error: 'No main picture!!!'})
    }

    const place = new Place({
        title,
        description,
        mainPicture: req.file.filename,
        userId: req.user._id,
        datetime: new Date()
    });

    try {
        await place.save();
        res.send({message: 'Added place'})
    } catch (e) {
        res.status(401).send(e)
    }
});

router.post('/images', auth, upload.array('images', 12), async (req,res) => {
    let images = [];
    if (req.files){
        images = req.files.map(file => file.filename)
    }
    const place = await Place.findOne({_id: req.body.placeId, userId: req.user._id});
    place.images = [...place.images, ...images];

    try{
        await place.save();
        res.send({message: 'Added images' , place})
    }catch (e) {
        res.status(401).send(e)
    }
});

router.post('/images/:id', auth, async (req,res)=> {
   if (req.user.role !== 'admin'){
       return res.status(401).send({error : 'У вас нет дуступа '})
   }
    const place =await Place.findOne({_id: req.params.id});
   let newPlace = place.images.filter(el =>el !== req.body.name);
    place.images = newPlace;
    try{
        await place.save();
        res.send({message: 'Removed image!!!'})
   }catch (e) {
        res.status(401).send(e)
   }
});

router.get('/', async (req, res) => {
    const places = await Place.find().populate('userId');
    res.send(places)
});

router.get('/:id', async (req, res) => {
    const place = await Place.findOne({_id: req.params.id}).populate('userId');
    res.send(place);
});

router.delete('/:id', auth, async (req,res)=> {
    if (req.user.role !== 'admin'){
       return  res.status(401).send({error: 'У вас нет прав для удаления '})
    }
    try{
        await Place.deleteOne({_id: req.params.id});
        res.send({message: 'Removed success!!!'})
    }catch (e) {
        res.status(401).send(e)
    }
});




module.exports = router;