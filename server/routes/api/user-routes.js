const router = require('express').Router();
const {

} = require('../../controllers/user-controller');

// import middleware
const { authMiddleware } = require('../../utils/auth');

router.route('/login').post(login);

router.route('/me').get(authMiddleware, getSingleUser);


module.exports = router;