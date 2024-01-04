const data = {
  employess: require('../model/employees.json'),
  setEmployees: function (data) { this.employess = data }
};


const getAllEmployees = (req, res) => {
  res.json(data.employess)
}

const createEmployee = (req, res) => {
  const { firstname, lastname } = req.body;
  const generatedId = data.employess[data.employess.length - 1].id + 1 || 1;
  const newEmployee = {
    id: generatedId,
    firstname,
    lastname
  }
  if (!firstname || !lastname) {
    res.status(404).json({ message: 'First name and lastname are required' })
  }
  data.setEmployees([...data.employess, newEmployee]);
  res.status(200).json(data.employess);
}

const updateEmployee = (req, res) => {
  const { id, firstname, lastname } = req.body;
  const userToUpdate = data.employess.find(employee => employee.id === id);
  if (userToUpdate) {
    userToUpdate.firstname = firstname;
    userToUpdate.lastname = lastname;
    data.setEmployees(data.employess);
    res.json(data.employess);
  } else {
    res.status(404).json({ message: 'user not found' })
  }
}

const deleteEmployee = (req, res) => {
  const newData = data.employess.filter(employee => employee.id !== req.body.id);
  res.json(newData)
}

const getEmployeeById = (req, res) => {
  res.json({ 'id': req.params.id })
}

module.exports = {
  getAllEmployees,
  updateEmployee,
  createEmployee,
  deleteEmployee,
  getEmployeeById
}