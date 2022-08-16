const router = require('express').Router();

router.get('/signup', controllers.userAuth.signUpGet);
router.get('/signin', controllers.userAuth.signIn);
router.post('/signup', controllers.userAuth.signUpPost);
router.post('/create-account', controllers.userAuth.createAccount);