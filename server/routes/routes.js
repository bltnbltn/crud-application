const express = require('express');
const router = express.Router();
const User = require('../model/model');
const multer = require('multer');

// Import
const controller = require('../controller/controller');
const authMiddleware = require('../middleware/middleware');
const services = require('../services/render');
const userController = require('../controller/user.controller');

// Define

router.get('/', services.homeRoutes); // Render the home page
router.get('/blogs/:id', controller.getBlogById);

router.get('/write', (req, res) => {
  res.render('write_article', { title: 'Article' });
});

router.get('/sign-in', (req, res) => {
  res.render('sign_in', { title: 'Sign In' });
});

router.get('/sign-up', (req, res) => {
  res.render('sign_up', { title: 'Sign Up' });
});

// Define route handlers for the API endpoints (TASK)
router.post(
  '/api/articles',
  authMiddleware.authenticateToken,
  controller.create
); // Create a new task
router.get('/api/articles', controller.find); // Retrieve all tasks
router.put(
  '/api/articles:id',
  authMiddleware.authenticateToken,
  controller.update
); // Update a task by ID
router.delete(
  '/api/articles/:id',
  authMiddleware.authenticateToken,
  controller.delete
); // Delete a task by ID

// sign in / sign up
router.post('/api/sign-up', userController.registerUser);
router.post('/api/sign-in', userController.signInUser);

// Export
module.exports = router;
