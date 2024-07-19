const express = require('express');
const { createLog, getLogs } = require('../controllers/logController');
const { protect } = require('../middlewares/authMiddleware');
const router = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     Log:
 *       type: object
 *       required:
 *         - level
 *         - message
 *       properties:
 *         id:
 *           type: string
 *           description: The auto-generated id of the log
 *         level:
 *           type: string
 *           enum: ['info', 'warn', 'error']
 *           description: The level of the log
 *         message:
 *           type: string
 *           description: The log message
 *         meta:
 *           type: object
 *           description: Additional meta information
 *         timestamp:
 *           type: string
 *           format: date-time
 *           description: The timestamp when the log was created
 *       example:
 *         id: d5fE_asz
 *         level: "info"
 *         message: "User logged in"
 *         meta: { "userId": "60d0fe4f5311236168a109ca" }
 *         timestamp: "2021-07-01T12:00:00.000Z"
 */

/**
 * @swagger
 * tags:
 *   name: Logs
 *   description: Log management
 */

/**
 * @swagger
 * /api/logs:
 *   post:
 *     summary: Create a new log
 *     tags: [Logs]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Log'
 *     responses:
 *       201:
 *         description: The log was successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Log'
 *       400:
 *         description: Bad request
 */
router.post('/', protect, createLog);

/**
 * @swagger
 * /api/logs:
 *   get:
 *     summary: Get all logs
 *     tags: [Logs]
 *     responses:
 *       200:
 *         description: A list of logs
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Log'
 */
router.get('/', protect, getLogs);

module.exports = router;