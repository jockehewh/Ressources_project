import dotenv from 'dotenv';
dotenv.config();
import expressJwt from 'express-jwt';
import User from "../models/User";

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
    const user = await User.findById(payload.sub);
    if(!user){
        return done(null, true);
    }
    done();
}

export default jwt;
