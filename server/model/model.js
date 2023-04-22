// Import Mongoose library
const mongoose = require('mongoose');

// Define a new Mongoose schema for the "taskdb" collection
var schema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  subhead: {
    type: String,
    required: true,
    default: Date.now,
  },
  content: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
});

// Create a Mongoose model for the "taskdb" collection using the schema
const taskdb = mongoose.model('taskdb', schema);

// Export the taskdb model so it can be used by other modules
module.exports = taskdb;

// ========== BREAKDOWN ========= //

// name: A required string that represents the name of the user.
// task: A required string that represents the task description. It is also set to be unique.
// role: A string that represents the role of the user.
// status: A string that represents the status of the task.

// These properties will be used to define the structure of each document in the `taskdb` collection, and the `taskdb` model will allow other modules to perform CRUD (Create, Read, Update, Delete) operations on the collection.
