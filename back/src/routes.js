import { Router } from 'express';

import UserController from "./controllers/UserController";
import PartnerController from "./controllers/PartnerController";
import RoleController from "./controllers/RoleController";
import CityController from "./controllers/CityController";
import Web_articleController from "./controllers/Web_articleController";
import Scientific_publicationController from "./controllers/Scientific_publicationController";
import EventController from "./controllers/EventController";
import Web_siteController from "./controllers/Web_siteController";

import Multer from "./utils/Multer"
import Auth from "./utils/Auth";

const router = Router();

/**
 * Users
 */
router.get('/users', Auth.isAllowed([20]), UserController.list);
router.get('/users/by/:partner_id', UserController.list_by_partner);
router.get('/users/:id', UserController.details);
router.post('/users/auth', UserController.auth);
router.post('/users', Multer.upload('users', 'thumbnail'), UserController.store);
router.put('/users/:id', UserController.update);
router.put('/users/:id/thumbnail', Multer.upload('users', 'thumbnail'), UserController.updateThumbnail);
router.delete('/users/:id', UserController.remove);

/**
 * Partners
 */
router.get('/partners', Auth.isAllowed([20]), PartnerController.list);
router.get('/partners/:id', PartnerController.details);
router.post('/partners', Multer.upload('partners', 'thumbnail'), PartnerController.store);
router.put('/partners/:id', PartnerController.update);
router.put('/partners/:id/thumbnail',  Multer.upload('partners', 'thumbnail'), PartnerController.updateThumbnail);
router.delete('/partners/:id', PartnerController.remove);

/**
 * Roles
 */
router.get('/roles',  RoleController.list);
router.get('/roles/:id', RoleController.details);
router.post('/roles', RoleController.store);
router.put('/roles/:id', RoleController.update);
router.delete('/roles/:id', RoleController.remove);

/**
 * Cities
 */
router.get('/cities',  CityController.list);
router.get('/cities/:codePostal', CityController.details);

/**
 * Web_articles
 */
router.get('/webarticles', Auth.isAllowed([20]), Web_articleController.list);
router.get('/webarticles/by/:partner_id', Web_articleController.list_by_partner);
router.get('/webarticles/:id', Web_articleController.details);
router.post('/webarticles', Multer.upload('web_articles', 'thumbnail'), Web_articleController.store);
router.put('/webarticles/:id', Web_articleController.update);
router.put('/webarticles/:id/thumbnail', Multer.upload('web_articles', 'thumbnail'), Web_articleController.updateThumbnail);
router.delete('/webarticles/:id', Web_articleController.remove);
//Public
router.get('/webarticles_public', Web_articleController.list);
router.get('/webarticles_public/:id', Web_articleController.details);

/**
 * Web_sites
 */
router.get('/websites', Auth.isAllowed([20]),  Web_siteController.list);
router.get('/websites/by/:partner_id', Web_siteController.list_by_partner);
router.get('/websites/:id', Web_siteController.details);
router.post('/websites', Multer.upload('web_sites', 'thumbnail'), Web_siteController.store);
router.put('/websites/:id', Web_siteController.update);
router.put('/websites/:id/thumbnail', Multer.upload('web_sites', 'thumbnail'), Web_siteController.updateThumbnail);
router.delete('/websites/:id', Web_siteController.remove);
//Public
router.get('/websites_public', Web_siteController.list);
router.get('/websites_public/:id', Web_siteController.details);

/**
 * Scientific_publications
 */
router.get('/scientificpublications',  Auth.isAllowed([20]), Scientific_publicationController.list);
router.get('/scientificpublications/by/:partner_id', Scientific_publicationController.list_by_partner);
router.get('/scientificpublications/:id', Scientific_publicationController.details);
router.post('/scientificpublications', Multer.upload('scientific_publications', 'thumbnail'), Scientific_publicationController.store);
router.put('/scientificpublications/:id', Scientific_publicationController.update);
router.put('/scientificpublications/:id/thumbnail', Multer.upload('scientific_publications', 'thumbnail'), Scientific_publicationController.updateThumbnail);
router.delete('/scientificpublications/:id', Scientific_publicationController.remove);
//Public
router.get('/scientificpublications_public', Scientific_publicationController.list);
router.get('/scientificpublications_public/:id', Scientific_publicationController.details);

/**
 * Events
 */
router.get('/events', Auth.isAllowed([20]), EventController.list);
router.get('/events/by/:partner_id', EventController.list_by_partner);
router.get('/events/:id', EventController.details);
router.post('/events', Multer.upload('events', 'thumbnail'), EventController.store);
router.put('/events/:id', EventController.update);
router.put('/events/:id/thumbnail', Multer.upload('events', 'thumbnail'), EventController.updateThumbnail);
router.delete('/events/:id', EventController.remove);
//Public
router.get('/events_public', EventController.list);
router.get('/events_public/:id', EventController.details);


export default router;