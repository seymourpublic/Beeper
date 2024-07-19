const express = require('express');
const { sendMessage, getUserMessages, getGroupMessages } = require('../controllers/messageController');
const { protect } = require('../middlewares/authMiddleware');
const router = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     Message:
 *       type: object
 *       required:
 *         - content
 *         - senderId
 *       properties:
 *         id:
 *           type: string
 *           description: The auto-generated id of the message
 *         content:
 *           type: string
 *           description: The content of the message
 *         senderId:
 *           type: string
 *           description: The ID of the user who sent the message
 *         recipientId:
 *           type: string
 *           description: The ID of the recipient user
 *         groupId:
 *           type: string
 *           description: The ID of the recipient group
 *         timestamp:
 *           type: string
 *           format: date-time
 *           description: The timestamp when the message was sent
 *         readStatus:
 *           type: boolean
 *           description: The read status of the message
 *       example:
 *         id: d5fE_asz
 *         content: "Hello, this is a message"
 *         senderId: "60d0fe4f5311236168a109ca"
 *         recipientId: "60d0fe4f5311236168a109cb"
 *         groupId: "60d0fe4f5311236168a109cc"
 *         timestamp: "2021-07-01T12:00:00.000Z"
 *         readStatus: false
 */

/**
 * @swagger
 * tags:
 *   name: Messages
 *   description: Message management
 */

/**
 * @swagger
 * /api/messages:
 *   post:
 *     summary: Send a message
 *     tags: [Messages]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Message'
 *     responses:
 *       201:
 *         description: The message was successfully sent
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Message'
 *       400:
 *         description: Bad request
 */
router.post('/', protect, sendMessage);

/**
 * @swagger
 * /api/messages:
 *   get:
 *     summary: Get all messages for the logged-in user
 *     tags: [Messages]
 *     responses:
 *       200:
 *         description: A list of messages
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Message'
 */
router.get('/', protect, getUserMessages);

/**
 * @swagger
 * /api/messages/group/{groupId}:
 *   get:
 *     summary: Get all messages for a group
 *     tags: [Messages]
 *     parameters:
 *       - in: path
 *         name: groupId
 *         schema:
 *           type: string
 *         required: true
 *         description: The group ID
 *     responses:
 *       200:
 *         description: A list of messages
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Message'
 *       404:
 *         description: Group not found
 */
router.get('/group/:groupId', protect, getGroupMessages);

module.exports = router;