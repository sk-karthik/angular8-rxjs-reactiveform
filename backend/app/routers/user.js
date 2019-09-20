const express = require('express')
const User = require('../models/User.model')
const auth = require('../middleware/auth')

const router = express.Router()
const handleErrorAsync = func => (req, res, next) => {
    func(req, res, next).catch((error) => {
        next(error)
    });
};

router.post('/user/register', handleErrorAsync(async (req, res, next) => {
    // Create a new user
    try {
        const user = new User(req.body)
        await user.save()
        const token = await user.generateAuthToken()
        res.status(201).send({ user, token })
    } catch (error) {
        res.status(400).send(error)
    }
}));

router.post('/user/login', handleErrorAsync(async (req, res) => {
    //Login a registered user

    try {
        const { email, password } = req.body;
        const user = await User.findByCredentials(email, password);

        if (!user) {
            return res.status(401).json({ message: 'Login failed! Check authentication credentials' })
        }
        const token = await user.generateAuthToken()
        res.status(200).json({ user, token })
    } catch (err) {
        res.status(400).json({ error: err.message })
        // res.status(400).json({ error: "API Failed" })
    }
}))

router.get('/user/profile', auth, async (req, res) => {
    // View logged in user profile
    res.send(req.user)
})

router.post('/user/list', auth, async (req, res) => {

    // res.send(req.user)
    User.find({}, {}, function (e, docs) { res.send(docs); })
})

router.post('/user/profile/logout', auth, async (req, res) => {
    // Log user out of the application
    try {
        req.user.tokens = req.user.tokens.filter((token) => {
            return token.token != req.token
        })
        await req.user.save()
        res.send()
    } catch (error) {
        res.status(500).send(error)
    }
})

router.post('/user/profile/logoutall', auth, async (req, res) => {
    // Log user out of all devices
    try {
        req.user.tokens.splice(0, req.user.tokens.length)
        await req.user.save()
        res.send()
    } catch (error) {
        res.status(500).send(error)
    }
})

module.exports = router