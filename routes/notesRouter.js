const express = require('express');
const { readFromFile, uuid, notesData, readAndAppend } = require('../helpers/reading');
const router = express.Router();

router.get('/', (req, res) => {
  // Logging that a GET request was received
  console.log(`${req.method} request received.`);
  // Reading the db.json and parsing the content
  readFromFile('./db/db.json').then((data) => res.json(JSON.parse(data)));
});

router.post('/', (req, res) => {
  // Logging that a POST request was received
  console.log(`${req.method} request received.`);

  // Destructuring assignment for the items in req.body
  const { title, text } = req.body;
  console.log('Object created.');
  // Checks for all properties
  if (title && text) {
    const newNotes = {
      title,
      text,
      id: uuid(),
    };

    readAndAppend(newNotes, './db/db.json');

    const response = {
      status: 'success',
      body: newNotes,
    };

    res.json(response);
  } else {
    res.json('Error in posting feedback');
  }
});

module.exports = router;
