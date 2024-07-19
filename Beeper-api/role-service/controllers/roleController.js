const Role = require('../models/Role');

// Create a new role
const createRole = async (req, res) => {
  const { roleName } = req.body;

  const roleExists = await Role.findOne({ roleName });

  if (roleExists) {
    return res.status(400).json({ message: 'Role already exists' });
  }

  const role = new Role({ roleName });

  await role.save();

  res.status(201).json({ message: 'Role created', role });
};

// Get all roles
const getRoles = async (req, res) => {
  const roles = await Role.find({});
  res.json(roles);
};

// Delete a role
const deleteRole = async (req, res) => {
  const role = await Role.findById(req.params.id);

  if (role) {
    await role.remove();
    res.json({ message: 'Role removed' });
  } else {
    res.status(404).json({ message: 'Role not found' });
  }
};

module.exports = { createRole, getRoles, deleteRole };