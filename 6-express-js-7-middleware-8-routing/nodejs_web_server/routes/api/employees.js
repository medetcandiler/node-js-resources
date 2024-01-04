const express = require('express');
const router = express.Router();
const { getAllEmployees, createEmployee, updateEmployee, deleteEmployee, getEmployeeById } = require('../../controllers/employeesController')

router.route('/')
  .get(getAllEmployees)
  .post(createEmployee)
  .put(updateEmployee)
  .delete(deleteEmployee);

router.route('/:id')
  .get(getEmployeeById)

module.exports = router;
