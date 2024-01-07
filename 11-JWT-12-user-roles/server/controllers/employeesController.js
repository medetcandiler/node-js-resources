const Employee = require('../model/Employee');

const getAllEmployees = async (req, res) => {
  const result = await Employee.find({});
  res.json(result);
};

const createNewEmployee = async (req, res) => {
  const { firstname, lastname } = req.body
  const newEmployee = {
    firstname,
    lastname
  }
  if (!newEmployee.firstname || !newEmployee.lastname) {
    return res.status(400).json({ 'message': 'First and last names are required.' });
  }
  const result = await Employee.create(newEmployee);
  res.status(201).json(result);
};

const updateEmployee = async (req, res) => {
  const { firstname, lastname, id } = req.body
  try {
    const employee = await Employee.findById(id).exec();
    if (!employee) {
      return res.status(400).json({ "message": `Employee ID ${id} not found` });
    }
    if (firstname && lastname) {
      employee.firstname = firstname;
      employee.lastname = lastname
    }
    const result = await employee.save();

    res.json(result);
  } catch (err) {
    console.log(err.message)
    res.status(500).json({ message: 'internal server error' });
  }
};

const deleteEmployee = async (req, res) => {
  const { id } = req.body;
  try {
    const result = await Employee.findByIdAndDelete(id);
    if (!result) {
      return res.status(400).json({ "message": `Employee ID ${id} not found` });
    }
    res.json(result);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: 'internal server error' });
  }
};

const getEmployee = async (req, res) => {
  const { id } = req.params
  try {
    const employee = await Employee.findById(id).exec();
    if (!employee) {
      return res.status(400).json({ "message": `Employee ID ${id} not found` });
    }
    res.json(employee);
  } catch (err) {
    console.log(err)
    res.status(500).json({ message: 'Interner server error' });
  }
};

module.exports = {
  getAllEmployees,
  createNewEmployee,
  updateEmployee,
  deleteEmployee,
  getEmployee
}