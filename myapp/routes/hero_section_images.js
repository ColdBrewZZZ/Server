var express = require('express');
var router = express.Router();
var mysql = require('mysql2');

const {connection} = require('../db/config')

router.get('/', function(req, res, next) {
  connection.query('SELECT * FROM hero_section_images', (err, results) => {
    if (err) {
      console.error(err);
      res.status(500).send('Internal Server Error');
      return;
    }

    res.json(results);
  });
});

router.get('/:id', function(req, res, next) {
  const id = req.params.id;

  connection.query('SELECT photo_path FROM hero_section_images WHERE id = ?', [id], (err, results) => {
    if (err) {
      console.error(err);
      res.status(500).send('Internal Server Error');
      return;
    }

    if (results.length === 0) {
      res.status(404).send('Image not found');
      return;
    }

    const photoPath = results[0].photo_path;
    res.json({ photoPath });
  });
});

module.exports = router;
