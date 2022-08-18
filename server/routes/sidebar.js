const router = require('express').router();
const controllers = require('../controllers/forums.js');

router.get('/userName', controllers.getName);
