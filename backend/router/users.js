const router = require('express').Router();
const User = require('../models/User');

router.post('/', async (req, res) => {
    const {username, password, fullName} = req.body;
    const user = new User({username, password, fullName});

    try {
        await user.generationToken();
        await user.save();
        res.send({message: 'Registered success!!!', user})
    } catch (e) {
        res.status(401).send(e)
    }
});

router.post('/sessions', async (req, res) => {
    const {username, password} = req.body;
    const message = 'Username or password in correct!!!';

    const user = await User.findOne({username});
    if (!user) {
        return  res.status(401).send(message);
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
        return res.status(401).send(message);
    }

    try {
        await user.generationToken();
        await user.save();
        res.send({message: 'Login success!!!', user})
    } catch (e) {
        res.status(401).send(e)
    }
});

router.delete('/sessions', async (req, res) => {
    const success = {message: 'Success'};
    try {
        const token = req.get('Authorization').split(' ')[1];
        if (!token) res.send(success);

        const user = await User.findOne({token});
        if (!user) res.send(success);

        user.generationToken();
        await user.save();

        return res.send(success)
    } catch (e) {
        return res.send(success)
    }
});

module.exports = router;