const Employee = require('../model/Employee');

const getAllEmployees = async (_, res) => {
  const result = await Employee.find({});
  if (!result) return res.status(204).json({ message: 'No employee found' })
  res.json(result);
};

const createNewEmployee = async (req, res) => {
  const { firstname, lastname } = req.body
  if (!firstname && !lastname) {
    return res.status(400).json({ 'message': 'First and last names are required.' });
  }
  const newEmployee = {
    firstname,
    lastname
  }
  try {
    const result = await Employee.create(newEmployee);
    res.status(201).json(result); // 201 created
  } catch (err) {
    console.log(err)
  }

};

const updateEmployee = async (req, res) => {
  const { firstname, lastname, id } = req.body
  try {
    const employee = await Employee.findById(id).exec();
    if (!employee) {
      return res.status(204).json({ "message": `Employee ID ${id} not found` }); // 204 does not exist
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
  if (!id) return res.status(400).json({ message: 'Emloyee ID required' })
  try {
    const result = await Employee.findByIdAndDelete(id);
    if (!result) {
      return res.status(204).json({ "message": `Employee ID ${id} not found` });
    }
    res.json(result);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: 'internal server error' });
  }
};

const getEmployee = async (req, res) => {
  const { id } = req.params
  if (!id) return res.status(400).json({ message: 'Employee ID required' });
  try {
    const employee = await Employee.findById(id).exec();
    if (!employee) {
      return res.status(204).json({ "message": `Employee ID ${id} not found` });
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