const controllers = require('../controllers');
const router = require('express').Router();
// const {checkIfAuthenticated} = require('../middleware.js');

router.post('/signup', controllers.userAuth.signUpPost);
router.post('/create-account', controllers.userAuth.createAccount);
router.get('/allLanguages', controllers.userAuth.getAllLanguages);
router.get('/allJargons', controllers.userAuth.getAllJargons);
router.get('/getUserId', controllers.userAuth.getUserId);

module.exports = router;
