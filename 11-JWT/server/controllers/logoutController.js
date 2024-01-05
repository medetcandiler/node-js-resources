const usersDB = {
  users: require('../model/users.json'),
  setUsers: function (data) { this.users = data }
}
const fsPromises = require('fs').promises;
const path = require('path');

const handleLogout = async (req, res) => {
  // On client, also delete the accessToken( we could not delete the memory accesstoken from server do that on frontend)
  const cookies = req.cookies;
  if (!cookies?.jwt) return res.sendStatus(204); // Succesfull but no content
  const refreshToken = cookies.jwt;

  const foundUser = usersDB.users.find(person => person.refreshToken === refreshToken);
  if (!foundUser) {
    res.clearCookie('jwt', { httpOnly: true });
    return res.sendStatus(204); // Succesfull but no content
  }
  // delete the refresh token from the database 
  const otherUsers = usersDB.users.filter(user => user.refreshToken !== refreshToken);
  const currentUser = { ...foundUser, 'refreshToken': '' };
  usersDB.setUsers([...otherUsers, currentUser]);
  await fsPromises.writeFile(path.join(__dirname, '..', 'model', 'users.json'), JSON.stringify(usersDB.users));
  res.clearCookie('jwt', { httpOnly: true, sameSite: 'None' }) // secure: true - only serves on https in development we could not but in production we will add it 
}

module.exports = { handleLogout }