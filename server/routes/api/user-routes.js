const router = require('express').Router();
const {
  createUser,
  getSingleUser,
  login,
//   getStats
} = require('../../controllers/user-controller');

// import middleware
const { authMiddleware } = require('../../utils/auth');

// put authMiddleware anywhere we need to send a token for verification of user
router.route('/api/users').post(createUser).put(authMiddleware);

router.route('/api/users/login').post(login);

router.route('/me').get(authMiddleware, getSingleUser);

// router.route('/scores').get(getStats)

module.exports = router;