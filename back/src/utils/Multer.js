const multer = require('multer');
const path = require('path');
const fs = require('fs');
const {generateStringRandom} = require("./Utils");


    const upload = (uploadPath, identifier)=>{
        return (req, res, next) => {

            const storage = multer.diskStorage({
                destination: (req, file, cb) => {
                    if(!fs.existsSync(`./uploads`))
                        fs.mkdirSync(`./uploads/`);
                    if(!fs.existsSync(`./uploads/${uploadPath}`))
                        fs.mkdirSync(`./uploads/${uploadPath}`);
                    cb(null, `./uploads/${uploadPath}`)
                },
                filename: (req, file, cb) => {
                    let name = generateStringRandom() + path.extname(file.originalname);
                    req.body[identifier] = `uploads/${uploadPath}/${name}`;
                    cb(null, name)
                }
            });

            let upl = multer({storage}).single(identifier);
            upl(req, res, next, () => next());
        }
    }
