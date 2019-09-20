const jwt = require('jsonwebtoken')
const User = require('../models/User.model')

const auth = async (req, res, next) => {
    const token = req.header('Authorization').replace('Bearer ', '')
    // const token = req.headers.authorization.split(' ')[1];
    console.log(token);
    //  console.log(req.headers['authorization']); return false;
    if (!token) {
        return res.status(401).send({ error: 'Access denied. No JWT provided.' });
    }

    const data = jwt.verify(token, process.env.JWT_KEY)
    console.log(data)
    try {
        const user = await User.findOne({ _id: data._id, 'tokens.token': token })
        if (!user) {
            throw new Error()
        }
        req.user = user
        req.token = token
        next()
    } catch (error) {
        res.status(401).send({ error: 'Not authorized to access this resource' })
    }

}
module.exports = auth
