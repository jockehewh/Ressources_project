const dotenv = require ("dotenv");
dotenv.config();
const express = require ("express");
const bodyParser = require ("body-parser");
const cors = require ("cors");
const {router} = require ("./routes");
const {jwt} = require ("./config/jwt");


const Server = {
    config: ()=>{
        const app = express();
        app.use(jwt());

        app.use('/uploads', express.static('uploads'));

        //Configuration de l'app
        app.use(bodyParser.urlencoded({extended: false}));
        app.use(bodyParser.json());
        app.use(cors({origin: true}));

        //Configuration des routes de l'API depuis routes.js
        app.use('/', router);

        return app;
    }
}

module.exports = {Server}