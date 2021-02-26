const dotenv = require('dotenv');
dotenv.config();
const expressJwt = require ('express-jwt');
const {userModel} = require ("../models/User");

const jwt = () => {
    const secret = process.env.JWT_SECRET;
    return expressJwt({secret: secret, algorithms: ['HS256'], isRevoked})
        .unless({
            path: [
                '/users/auth',
                /^\/api-docs\/.*/,
                /^\/uploads\/.*/
            ]
        });
};

async function isRevoked(req, payload, done){
    const user = await userModel.findById(payload.sub);
    if(!user){
        return done(null, true);
    }
    done();
}

module.exports = {jwt}
