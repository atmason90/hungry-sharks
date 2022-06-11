// import user model
const { User } = require('../models');
// import sign token function from auth
const { signToken } = require('../utils/auth');


module.exports = {

    async getSingleUser({ user = null, params }, res) {
      const foundUser = await User.findOne({
        $or: [{ _id: user ? user._id : params.id }, { username: params.username }],
      });
  
      if (!foundUser) {
        return res.status(400).json({ message: 'Cannot find a user with this id!' });
      }
  
      res.json(foundUser);
    },

    async createUser({ body }, res) {
      const user = await User.create(body);
  
      if (!user) {
        return res.status(400).json({ message: 'Something is wrong!' });
      }
      const token = signToken(user);
      res.json({ token, user });
    },
    // login a user, sign a token, and send it back (to client/src/components/LoginForm.js)
    // {body} is destructured req.body
    async login({ body }, res) {
      const user = await User.findOne({ $or: [{ username: body.username }, { email: body.email }] });
      if (!user) {
        return res.status(400).json({ message: "Can't find this user" });
      }
  
      const correctPw = await user.isCorrectPassword(body.password);
  
      if (!correctPw) {
        return res.status(400).json({ message: 'Wrong password!' });
      }
      const token = signToken(user);
      res.json({ token, user });
    },
       // find a user's stats
       async getUserStats({ user = null, params }, res) {
        const foundStats = await User.findOne({
          $or: [{ _id: user ? user._id : params.id }, { username: params.username, games: params.games, wins: params.wins, losses: params.losses }],
        });
  
        if (!foundStats) {
          return res.status(400).json({ message: 'Cannot find user!' });
        }
  
        res.json(foundStats);
      },

      async updateStats({ body}, res) {
        const filter = body.id;
        const update = {wins: body.gamesWon, losses: body.gamesLost, played: body.gamesPlayed}
        const userToUpdate =  await User.findOneAndUpdate(filter, update);

        if(!userToUpdate) {
          res.status(500);
        }

      }
}