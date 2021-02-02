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
router.put('/users/:id',  Multer.upload('users', 'thumbnail'), UserController.update);
router.delete('/users/:id', UserController.remove);

/**
 * Partners
 */
router.get('/partners', Auth.isAllowed([20]), PartnerController.list);
router.get('/partners/:id', PartnerController.details);
router.post('/partners', Multer.upload('partners', 'thumbnail'), PartnerController.store);
router.put('/partners/:id',  Multer.upload('partners', 'thumbnail'), PartnerController.update);
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
router.put('/webarticles/:id', Multer.upload('web_articles', 'thumbnail'), Web_articleController.update);
router.delete('/webarticles/:id', Web_articleController.remove);

/**
 * Web_sites
 */
router.get('/websites', Auth.isAllowed([20]),  Web_siteController.list);
router.get('/websites/by/:partner_id', Web_siteController.list_by_partner);
router.get('/websites/:id', Web_siteController.details);
router.post('/websites', Multer.upload('web_sites', 'thumbnail'), Web_siteController.store);
router.put('/websites/:id', Multer.upload('web_sites', 'thumbnail'), Web_siteController.update);
router.delete('/websites/:id', Web_siteController.remove);

/**
 * Scientific_publications
 */
router.get('/scientificpublications',  Auth.isAllowed([20]), Scientific_publicationController.list);
router.get('/scientificpublications/by/:partner_id', Scientific_publicationController.list_by_partner);
router.get('/scientificpublications/:id', Scientific_publicationController.details);
router.post('/scientificpublications', Multer.upload('scientific_publications', 'thumbnail'), Scientific_publicationController.store);
router.put('/scientificpublications/:id', Multer.upload('scientific_publications', 'thumbnail'), Scientific_publicationController.update);
router.delete('/scientificpublications/:id', Scientific_publicationController.remove);

/**
 * Events
 */
router.get('/events', Auth.isAllowed([20]), EventController.list);
router.get('/events/by/:partner_id', EventController.list_by_partner);
router.get('/events/:id', EventController.details);
router.post('/events', Multer.upload('events', 'thumbnail'), EventController.store);
router.put('/events/:id', Multer.upload('events', 'thumbnail'), EventController.update);
router.delete('/events/:id', EventController.remove);

export default router;