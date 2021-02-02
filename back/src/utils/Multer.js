import multer from 'multer';
import path from 'path';
import fs from 'fs';
import Utils from "./Utils";

export default class Multer{

    static upload(uploadPath, identifier){
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
                    let name = Utils.generateStringRandom() + path.extname(file.originalname);
                    req.body[identifier] = `uploads/${uploadPath}/${name}`;
                    cb(null, name)
                }
            });

            let upl = multer({storage}).single(identifier);
            upl(req, res, next, () => next());
        }
    }
}
