const express = require('express');
const jsonfile = require('jsonfile');
const router = express.Router();

var file = 'data.json';

// Get notes from json file
router.get('/notes', (req, res) => {
    jsonfile.readFile(file, function (err, obj) {
        return res.json(obj);
    });
});

// Updates notes to json file
router.post('/notes', (req, res) => {
    var notes = req.body;
    jsonfile.writeFile(file, notes, function (err) {
        return res.json(err);
    });
});

module.exports = router;