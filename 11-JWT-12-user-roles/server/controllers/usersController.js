const User = require('../model/User');
const bcrypt = require('bcrypt');

const getUsers = async (_, res) => {
  try {
    const result = await User.find({});
    res.status(200).json(result)
  } catch (err) {
    console.log(err);
    res.status(500).json('Inter Server err')
  }
}

const createUser = async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) return res.status(400).json({ message: 'required' }) //400 not found
  const hashedPwd = await bcrypt.hash(password, 10);
  try {
    const newUser = {
      username,
      password: hashedPwd
    };
    const result = await User.create(newUser);
    res.status(201).json(result)// 201 created
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: 'Internal server error occured' });
  }
}

const updateUser = async (req, res) => {
  const { id, username, password } = req.body;
  if (!id || !username || !password) return res.status(400).json({ message: 'required' });
  try {
    const result = await User.findByIdAndUpdate(id, { username, password });
    if (!result) {
      res.status(204).json({ message: 'Did not found' });
    }
    res.status(200).json(result)
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "internal error" })
  }
}

const deleteUser = async (req, res) => {
  const { id } = req.body;
  if (!id) return res.status(400).json({ message: 'ID required' });
  try {
    const result = await User.findByIdAndDelete(id);
    if (!result) {
      return res.status(204).json({ "message": `User ID ${id} not found` });
    }
    res.json(result)
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ message: 'Internal server error occured' });
  }
}

const getUser = async (req, res) => {
  const { id } = req.params;
  if (!id) return res.status(400).json({ message: 'required ID' });
  try {
    const result = await User.findById(id).exec();
    if (!result) return res.status(204).json({ message: ' Not found ' });
    res.status(200).json(result);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: 'Internal error' });
  }
}




module.exports = {
  getUsers,
  createUser,
  updateUser,
  deleteUser,
  getUser
}