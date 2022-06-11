const router = require('express').Router();
// const { default: auth } = require('../../../client/src/utils/auth');
const {
  createUser,
  getSingleUser,
  login,
  getUserStats,
//   getStats
} = require('../../controllers/user-controller');

// import middleware
const { authMiddleware } = require('../../utils/auth');

// put authMiddleware anywhere we need to send a token for verification of user.
router.route('/').post(createUser);

router.route('/login').post(login);

router.route('/me').get(authMiddleware, getSingleUser);

// router.route('/scores').get(getStats)
router.route('/highscores').get(authMiddleware, getUserStats)

module.exports = router;