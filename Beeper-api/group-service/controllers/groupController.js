const Group = require('../models/Group');

// Create a new group
const createGroup = async (req, res) => {
  const { groupName, groupAdminId, members, department } = req.body;

  const groupExists = await Group.findOne({ groupName });

  if (groupExists) {
    return res.status(400).json({ message: 'Group already exists' });
  }

  const group = new Group({
    groupName,
    groupAdminId,
    members,
    department,
  });

  await group.save();

  res.status(201).json({ message: 'Group created', group });
};

// Get all groups
const getGroups = async (req, res) => {
  const groups = await Group.find({});
  res.json(groups);
};

// Get a single group by ID
const getGroupById = async (req, res) => {
  const group = await Group.findById(req.params.id);

  if (group) {
    res.json(group);
  } else {
    res.status(404).json({ message: 'Group not found' });
  }
};

// Add a member to a group
const addMemberToGroup = async (req, res) => {
  const { userId } = req.body;
  const group = await Group.findById(req.params.id);

  if (group) {
    if (!group.members.includes(userId)) {
      group.members.push(userId);
      await group.save();
      res.json({ message: 'Member added', group });
    } else {
      res.status(400).json({ message: 'User is already a member' });
    }
  } else {
    res.status(404).json({ message: 'Group not found' });
  }
};

// Remove a member from a group
const removeMemberFromGroup = async (req, res) => {
  const { userId } = req.body;
  const group = await Group.findById(req.params.id);

  if (group) {
    group.members = group.members.filter(member => member.toString() !== userId);
    await group.save();
    res.json({ message: 'Member removed', group });
  } else {
    res.status(404).json({ message: 'Group not found' });
  }
};

module.exports = { createGroup, getGroups, getGroupById, addMemberToGroup, removeMemberFromGroup };