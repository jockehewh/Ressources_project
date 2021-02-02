import Server from "./src/Server";
import Database from "./src/Database";

const app = Server.config();
const {APP_CONFIG, APP_PORT, DB_NAME, DB_HOST, DB_PORT, DB_USER, DB_PASSWORD} = process.env;

let urlDB;
if(APP_CONFIG === 'local'){
    urlDB = `mongodb://${DB_HOST}:${DB_PORT}/${DB_NAME}`;
}else if(APP_CONFIG === 'production'){
    urlDB = `mongodb+srv://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/${DB_NAME}?retryWrites=true&w=majority`;
}

Database.init(urlDB)
    .then(() => {
        console.log(`La base de données est connectée sur le port ${DB_PORT}...`);
        app.listen(APP_PORT, () => {
            console.log(`Le serveur est connecté sur le port ${APP_PORT}...`);
        });
    });
