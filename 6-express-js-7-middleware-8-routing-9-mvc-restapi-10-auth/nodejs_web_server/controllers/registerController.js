const usersDB = {
  users: require('../model/users.json'),
  setUsers: function (data) {
    this.users = data;
  }
};
const fsPromises = require('fs').promises;
const path = require('path');
const bcrypt = require('bcrypt');

const handleNewUser = async (req, res) => { // we will use async with bcrypt
  const { username, password } = req.body;
  if (!username || !password) return res.status(400).json({ message: 'Username and password are required' });
  // check for duplicate usernames in the db;
  const isDuplicate = usersDB.users.find(user => user.username === username);
  if (isDuplicate) return res.sendStatus(409) // duplicate error
  try {
    //encrypt te pass;
    const hashedPassword = await bcrypt.hash(password, 10);
    // store the new user 
    const newUser = {
      username,
      "password": hashedPassword
    };
    usersDB.setUsers([...usersDB.users, newUser]);
    await fsPromises.writeFile(
      path.join(__dirname, '..', 'model', 'users.json'),
      JSON.stringify(usersDB.users)
    );
    console.log(usersDB.users);
    res.status(201).json({ 'success': `New user ${username} created` }) // 201 => new user created
  } catch (err) {
    res.status(500).json({ 'message': err.message }); // 500 => server error.
  }
}

module.exports = { handleNewUser };