const jsonwebtoken = require('jsonwebtoken');
const {userModel} = require('../models/User');
const {roleModel} = require('../models/Role');

const isAllowed = (roles)=>{
        return async (req, res, next) => {

            try{
                let token = req.headers.authorization.replace(/Bearer /g, '');
                let decryptToken = jsonwebtoken.decode(token, process.env.JWT_SECRET);
                let user = await userModel.findById(decryptToken.sub);
                let role = await roleModel.findById(user.role);
                
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
    
module.exports = {isAllowed}