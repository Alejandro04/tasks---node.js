const express = require('express');
const router = express.Router();

router.get('/users/signin', (req, res) => {
    res.send('SIGNIN')
})

router.get('/users/signup', (req, res) => {
    res.send('SIGNUP')
})

module.exports = router;