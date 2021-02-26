const { Router } = require ('express')

const {UserController} = require ("./controllers/UserController");
const {PartnerController} = require ("./controllers/PartnerController");
const {RoleController} = require ("./controllers/RoleController");
const {CityController} = require ("./controllers/CityController");
const {Web_articleController} = require ("./controllers/Web_articleController");
const {Scientific_publicationController} = require ("./controllers/Scientific_publicationController");
const {EventController} = require ("./controllers/EventController");
const {Web_siteController} = require ("./controllers/Web_siteController");

const {upload} = require ("./utils/Multer")
const {isAllowed} = require ("./utils/Auth");

const router = Router();

/**
 * Users
 */
router.get('/users', isAllowed([20]), UserController.list);
router.get('/users/by/:partner_id', UserController.list_by_partner);
router.get('/users/:id', UserController.details);
router.post('/users/auth', UserController.auth);
router.post('/users', upload('users', 'thumbnail'), UserController.store);
router.put('/users/:id', UserController.update);
router.put('/users/:id/thumbnail', upload('users', 'thumbnail'), UserController.updateThumbnail);
router.delete('/users/:id', UserController.remove);

/**
 * Partners
 */
router.get('/partners', isAllowed([20]), PartnerController.list);
router.get('/partners/:id', PartnerController.details);
router.post('/partners', upload('partners', 'thumbnail'), PartnerController.store);
router.put('/partners/:id', PartnerController.update);
router.put('/partners/:id/thumbnail',  upload('partners', 'thumbnail'), PartnerController.updateThumbnail);
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
router.get('/webarticles', isAllowed([20]), Web_articleController.list);
router.get('/webarticles/by/:partner_id', Web_articleController.list_by_partner);
router.get('/webarticles/:id', Web_articleController.details);
router.post('/webarticles', upload('web_articles', 'thumbnail'), Web_articleController.store);
router.put('/webarticles/:id', Web_articleController.update);
router.put('/webarticles/:id/thumbnail', upload('web_articles', 'thumbnail'), Web_articleController.updateThumbnail);
router.delete('/webarticles/:id', Web_articleController.remove);

/**
 * Web_sites
 */
router.get('/websites', isAllowed([20]),  Web_siteController.list);
router.get('/websites/by/:partner_id', Web_siteController.list_by_partner);
router.get('/websites/:id', Web_siteController.details);
router.post('/websites', upload('web_sites', 'thumbnail'), Web_siteController.store);
router.put('/websites/:id', Web_siteController.update);
router.put('/websites/:id/thumbnail', upload('web_sites', 'thumbnail'), Web_siteController.updateThumbnail);
router.delete('/websites/:id', Web_siteController.remove);

/**
 * Scientific_publications
 */
router.get('/scientificpublications',  isAllowed([20]), Scientific_publicationController.list);
router.get('/scientificpublications/by/:partner_id', Scientific_publicationController.list_by_partner);
router.get('/scientificpublications/:id', Scientific_publicationController.details);
router.post('/scientificpublications', upload('scientific_publications', 'thumbnail'), Scientific_publicationController.store);
router.put('/scientificpublications/:id', Scientific_publicationController.update);
router.put('/scientificpublications/:id/thumbnail', upload('scientific_publications', 'thumbnail'), Scientific_publicationController.updateThumbnail);
router.delete('/scientificpublications/:id', Scientific_publicationController.remove);

/**
 * Events
 */
router.get('/events', isAllowed([20]), EventController.list);
router.get('/events/by/:partner_id', EventController.list_by_partner);
router.get('/events/:id', EventController.details);
router.post('/events', upload('events', 'thumbnail'), EventController.store);
router.put('/events/:id', EventController.update);
router.put('/events/:id/thumbnail', upload('events', 'thumbnail'), EventController.updateThumbnail);
router.delete('/events/:id', EventController.remove);

module.exports = {router};