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
                '/webarticles_public',
                /^\/webarticles_public\/.*/,
                '/websites_public',
                /^\/websites_public\/.*/,
                '/scientificpublications_public',
                /^\/scientificpublications_public\/.*/,
                '/events_public',
                /^\/events_public\/.*/,
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
