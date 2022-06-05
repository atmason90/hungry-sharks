const router = require('express').Router();
const {
  createUser,
  getSingleUser,
  login
} = require('../../controllers/user-controller');

// import middleware
const { authMiddleware } = require('../../utils/auth');

// put authMiddleware anywhere we need to send a token for verification of user
router.route('/').post(createUser).put(authMiddleware);


router.route('/').post(login);

router.route('/').get(authMiddleware, getSingleUser);

module.exports = router;