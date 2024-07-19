const express = require('express');
const {
  createGroup,
  getGroups,
  getGroupById,
  addMemberToGroup,
  removeMemberFromGroup,
} = require('../controllers/groupController');
const { protect } = require('../middlewares/authMiddleware');
const router = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     Group:
 *       type: object
 *       required:
 *         - groupName
 *         - groupAdminId
 *         - department
 *       properties:
 *         id:
 *           type: string
 *           description: The auto-generated id of the group
 *         groupName:
 *           type: string
 *           description: The name of the group
 *         groupAdminId:
 *           type: string
 *           description: The ID of the user who is the group admin
 *         members:
 *           type: array
 *           items:
 *             type: string
 *           description: The IDs of the members of the group
 *         department:
 *           type: string
 *           description: The department to which the group belongs
 *       example:
 *         id: d5fE_asz
 *         groupName: "Doctors Group"
 *         groupAdminId: "60d0fe4f5311236168a109ca"
 *         members: ["60d0fe4f5311236168a109cb"]
 *         department: "Cardiology"
 */

/**
 * @swagger
 * tags:
 *   name: Groups
 *   description: Group management
 */

/**
 * @swagger
 * /api/groups:
 *   post:
 *     summary: Create a new group
 *     tags: [Groups]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Group'
 *     responses:
 *       201:
 *         description: The group was successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Group'
 *       400:
 *         description: Bad request
 */
router.post('/', protect, createGroup);

/**
 * @swagger
 * /api/groups:
 *   get:
 *     summary: Get all groups
 *     tags: [Groups]
 *     responses:
 *       200:
 *         description: A list of groups
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Group'
 */
router.get('/', protect, getGroups);

/**
 * @swagger
 * /api/groups/{id}:
 *   get:
 *     summary: Get a group by ID
 *     tags: [Groups]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The group ID
 *     responses:
 *       200:
 *         description: A group object
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Group'
 *       404:
 *         description: Group not found
 */
router.get('/:id', protect, getGroupById);

/**
 * @swagger
 * /api/groups/{id}/add-member:
 *   put:
 *     summary: Add a member to a group
 *     tags: [Groups]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The group ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userId:
 *                 type: string
 *                 description: The user ID to add to the group
 *             example:
 *               userId: "60d0fe4f5311236168a109cb"
 *     responses:
 *       200:
 *         description: Member added
 *       400:
 *         description: User is already a member
 *       404:
 *         description: Group not found
 */
router.put('/:id/add-member', protect, addMemberToGroup);

/**
 * @swagger
 * /api/groups/{id}/remove-member:
 *   put:
 *     summary: Remove a member from a group
 *     tags: [Groups]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The group ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userId:
 *                 type: string
 *                 description: The user ID to remove from the group
 *             example:
 *               userId: "60d0fe4f5311236168a109cb"
 *     responses:
 *       200:
 *         description: Member removed
 *       404:
 *         description: Group not found
 */
router.put('/:id/remove-member', protect, removeMemberFromGroup);

module.exports = router;