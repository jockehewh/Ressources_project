import jsonwebtoken from 'jsonwebtoken';
import User from '../models/User';
import Role from '../models/Role';

export default class Auth{

    /**
     * Check if user is right to access routes
     * @param roles
     * @returns {function(...[*]=)}
     */
    static isAllowed(roles){
        return async (req, res, next) => {

            try{
                let token = req.headers.authorization.replace(/Bearer /g, '');
                let decryptToken = jsonwebtoken.decode(token, process.env.JWT_SECRET);
                let user = await User.findById(decryptToken.sub);
                let role = await Role.findById(user.role);
                
                if(roles == (role.code)){
                    next();
                }else{
                    return res.status(401).json({message: 'Unauthorized'});
                }
            }catch (e) {
                return res.status(403).json({message: 'Missing token'});
            }
        }
    }
}
