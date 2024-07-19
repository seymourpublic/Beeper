const express = require('express');
const { createStatus, getStatuses, getMetrics } = require('../controllers/monitoringController');
const { protect } = require('../middlewares/authMiddleware');
const router = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     ServiceStatus:
 *       type: object
 *       required:
 *         - serviceName
 *         - status
 *       properties:
 *         id:
 *           type: string
 *           description: The auto-generated id of the status
 *         serviceName:
 *           type: string
 *           description: The name of the service
 *         status:
 *           type: string
 *           enum: ['UP', 'DOWN']
 *           description: The status of the service
 *         lastChecked:
 *           type: string
 *           format: date-time
 *           description: The timestamp when the status was last checked
 *       example:
 *         id: d5fE_asz
 *         serviceName: "user-service"
 *         status: "UP"
 *         lastChecked: "2021-07-01T12:00:00.000Z"
 */

/**
 * @swagger
 * tags:
 *   name: ServiceStatus
 *   description: Service status management
 */

/**
 * @swagger
 * /api/statuses:
 *   post:
 *     summary: Create a new service status
 *     tags: [ServiceStatus]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ServiceStatus'
 *     responses:
 *       201:
 *         description: The status was successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ServiceStatus'
 *       400:
 *         description: Bad request
 */
router.post('/statuses', protect, createStatus);

/**
 * @swagger
 * /api/statuses:
 *   get:
 *     summary: Get all service statuses
 *     tags: [ServiceStatus]
 *     responses:
 *       200:
 *         description: A list of statuses
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/ServiceStatus'
 */
router.get('/statuses', protect, getStatuses);

/**
 * @swagger
 * /api/metrics:
 *   get:
 *     summary: Get Prometheus metrics
 *     tags: [ServiceStatus]
 *     responses:
 *       200:
 *         description: Prometheus metrics
 */
router.get('/metrics', getMetrics);

module.exports = router;