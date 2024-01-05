const usersDB = {
  users: require('../model/users.json'),
  setUsers: function (data) { this.user = data }
};
const bcrypt = require('bcrypt');

const handleLogin = async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) return res.status(400).json({ 'message': 'Username and password are required' });
  const foundUser = usersDB.users.find(user => user.username === username);
  if (!foundUser) return res.sendStatus(401); // Unauthorised;

  // evaluate password
  const match = await bcrypt.compare(password, foundUser.password);
  if (match) {
    // we will create JWTs here
    res.json({ 'success': `User ${username} logged in!` })
  } else {
    res.sendStatus(401);
  }
};

module.exports = { handleLogin };