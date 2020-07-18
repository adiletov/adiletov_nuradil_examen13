const path = require('path');
const router = require('express').Router();
const auth = require('../middleware/auth');
const multer = require('multer');
const {nanoid} = require('nanoid');

const config = require('../config');
const Place = require('../models/Place');

const storage = multer.diskStorage({
    destination: (req,file,cb) =>{
        cb(null, config.uploadPath)
    },
    filename: (req,file,cb) =>{
        cb(null, nanoid() + path.extname(file.originalname))
    }
});

const upload = multer({storage});

router.post('/', auth, upload.single('mainPicture'), async (req,res) => {
    const {title, description} = req.body;

    if (!req.file){
        return res.status(401).send({error: 'No main picture!!!'})
    }

    const place = new Place({
        title,
        description,
        mainPicture: req.file.filename,
        userId: req.user._id,
        datetime: new Date()
    });

    try{
       await place.save();
       res.send({message: 'Added place'})
    }catch (e) {
        res.status(401).send(e)
    }
});

router.get('/', async (req, res) => {
   const places = await Place.find().populate('userId');

   res.send(places)
});


module.exports = router;