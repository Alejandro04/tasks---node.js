const express = require('express');
const router = express.Router();


router.get('/notes', (req, res) => {
    res.render('notes/all')
})

router.get('/notes/add', (req, res) => {
    res.render('notes/add')
})

router.post('/notes/add', (req, res) => {
    const { title, description } = req.body;
    const errors = [];
    if (!title) {
      errors.push({text: 'Ingrese el titulo'});
    }
    if (!description) {
      errors.push({text: 'Ingrese la descripción'});
    }
    if (errors.length > 0) {
      res.render('notes/add', {
        errors,
        title,
        description
      });
    } else {
      res.send("#vamos bien")
    }
})

router.get('/notes/edit', (req, res) => {
    res.render('notes/edit')
})

module.exports = router;