const router = require('express').Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
// Models and Secrets go here
const Users = require('./auth-model');
const secrets = require('../config/secrets');

router.post('/register', (req, res) => {
  // implement registration
  let user = req.body;
  const hash = bcrypt.hashSync(user.password, 10);
  user.password = hash;

  Users.add(user)
    .then(newUser => res.status(201).json(newUser))
    .catch(err => res.status(500).json(err))
});

router.post('/login', (req, res) => {
  // implement login
  let { username, password } = req.body;

  Users.findBy({ username })
  .first()
  .then(user => {
    if (user && bcrypt.compareSync(password, user.password)) {
      const token = generateToken(user);
      res.status(200).json({ 
        message: `Hello! ${user.username} Here is your token `, token
      })
    } else res.status(401).json({ message: 'Ooops! wrong credentials' })
  })
  .catch(err => res.status(500).json(err))
});

function generateToken(user) {
  const payload = {
    user: user.username,
    subject: user.id,
  }
}

module.exports = router;
