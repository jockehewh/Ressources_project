import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import router from "./routes";
import jwt from "./config/jwt";


export default class Server{

    /**
     * Config server
     * @returns {app}
     */
    static config(){
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
