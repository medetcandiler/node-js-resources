const express = require('express');
const router = express.Router();
const {
  getUsers,
  createUser,
  updateUser,
  deleteUser,
  getUser } = require('../../controllers/usersController');
const verifyRoles = require('../../middleware/verifyRoles');
const ROLES_LIST = require('../../config/roles_list');

router.route('/')
  .get(getUsers)
  .post(verifyRoles(ROLES_LIST.Admin, ROLES_LIST.Editor), createUser)
  .put(verifyRoles(ROLES_LIST.Admin, ROLES_LIST.Editor), updateUser)
  .delete(verifyRoles(ROLES_LIST.Admin), deleteUser);

router.route('/:id')
  .get(getUser)


module.exports = router;
