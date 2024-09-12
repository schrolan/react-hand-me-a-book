const jwt = require('jsonwebtoken')

const secret = "booksarethegreatest"
//After this amount of time the user would have to reauthenticate to get a new token
const expiration = '2hr'

module.exports = {
    //This encodes the data into the webtoken
    signToken: function({ email, username, _id }) {
        return jwt.sign(
        { 
            data: { 
                email, 
                username, 
                _id 
            } 
        }, 
            secret, 
            { expiresIn: expiration }
        )
    },
    //middleware function we set up on the apollo server to be able to grab the token from the front end
    authMiddleware: function({ req, res }) {
        let token = req.body.token || req.query.token || req.headers.authorization
        if (req.headers.authorization) {
            token = token.split(' ').pop().trim()
        }

        if(!token) {
            return req
        }

        try {
            const { data } = jwt.verify(token, secret, { expiresIn: expiration })
            req.user = data
        } catch(err) {
            console.log('Invalid Token', err)
        }

        return req
    }
}