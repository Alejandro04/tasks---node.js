const express = require('express');
const passport = require('passport');
const router = express.Router();

// Models
const User = require('../models/User');

router.get('/users/signin', (req, res) => {
  res.render('users/signin')
})

router.get('/users/signup', (req, res) => {
  res.render('users/signup')
})

router.post('/users/signup', async (req, res) => {
  let errors = [];
  const { name, email, password, confirm_password } = req.body;

  if (password != confirm_password) {
    errors.push({ text: 'Los passwords no coinciden' });
    console.log("Los passwords no coinciden")
  }
  if (password.length < 5) {
    errors.push({ text: 'El password debe tener mínimo 5 caracteres' })
    console.log("El password debe tener mínimo 5 caracteres")
  }
  if (errors.length > 0) {
    res.render('users/signup', { errors, name, email, password, confirm_password });
  } else {
    const emailUser = await User.findOne({ email: email });
    if (emailUser) {
      req.flash('error_msg', 'El email ya está en uso');
      res.redirect('/users/signup');
    } else {
      const newUser = new User({ name, email, password });
      newUser.password = await newUser.encryptPassword(password);
      await newUser.save();
      req.flash('success_msg', 'Registro exitoso');
      res.redirect('/users/signin');
    }
  }
});

router.post('/users/signin', passport.authenticate('local', {
  successRedirect: '/notes',
  failureRedirect: '/users/signin',
  failureFlash: true
}));


module.exports = router;