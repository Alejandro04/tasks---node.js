const express = require('express');
const router = express.Router();

const Note = require('../models/Note')


router.get('/notes/add', (req, res) => {
    res.render('notes/add')
})

router.post('/notes/add', async (req, res) => {
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
      const newNote = new Note({
        title,
        description
      })

      await newNote.save()
      res.redirect('/notes')
    }
})

router.get('/notes', async (req, res) => {
  const notes = await Note.find()
  
  res.render('notes/all', {notes})
})

router.get('/notes/edit', (req, res) => {
    res.render('notes/edit')
})

module.exports = router;