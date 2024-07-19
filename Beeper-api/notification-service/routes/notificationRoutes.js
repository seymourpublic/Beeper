const express = require('express');
const { getUserNotifications, markAsRead } = require('../controllers/notificationController');
const { protect } = require('../middlewares/authMiddleware');
const router = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     Notification:
 *       type: object
 *       required:
 *         - recipientId
 *         - message
 *       properties:
 *         id:
 *           type: string
 *           description: The auto-generated id of the notification
 *         recipientId:
 *           type: string
 *           description: The ID of the recipient user
 *         message:
 *           type: string
 *           description: The notification message
 *         readStatus:
 *           type: boolean
 *           description: The read status of the notification
 *         timestamp:
 *           type: string
 *           format: date-time
 *           description: The timestamp when the notification was created
 *       example:
 *         id: d5fE_asz
 *         recipientId: "60d0fe4f5311236168a109ca"
 *         message: "You have a new message"
 *         readStatus: false
 *         timestamp: "2021-07-01T12:00:00.000Z"
 */

/**
 * @swagger
 * tags:
 *   name: Notifications
 *   description: Notification management
 */

/**
 * @swagger
 * /api/notifications:
 *   get:
 *     summary: Get all notifications for the logged-in user
 *     tags: [Notifications]
 *     responses:
 *       200:
 *         description: A list of notifications
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Notification'
 */
router.get('/', protect, getUserNotifications);

/**
 * @swagger
 * /api/notifications/{id}/read:
 *   put:
 *     summary: Mark a notification as read
 *     tags: [Notifications]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The notification ID
 *     responses:
 *       200:
 *         description: Notification marked as read
 *       404:
 *         description: Notification not found
 */
router.put('/:id/read', protect, markAsRead);

module.exports = router;