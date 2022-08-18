const controllers = require('../controllers');
const router = require('express').Router();
const {checkIfAuthenticated} = require('../middleware.js');

router.post('/signup', controllers.userAuth.signUpPost);
router.post('/create-account', checkIfAuthenticated, controllers.userAuth.createAccount);
router.get('/allLanguages', checkIfAuthenticated, controllers.userAuth.getAllLanguages);
router.get('/allJargons', checkIfAuthenticated, controllers.userAuth.getAllJargons);
router.get('/getUserId', checkIfAuthenticated, controllers.userAuth.getUserId);

module.exports = router;
