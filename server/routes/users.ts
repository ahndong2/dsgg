const express = require('express');
const User = require('../models/user');

export const usersRouter = express.Router(); 
usersRouter.post('/users', (req, res) => {
  if (req.body.userId === "") {
    return res.status(400).json({
      error: "EMPTY USERID",
      code: 2
    });
  }
 
  if (req.body.userName === "") {
    return res.status(400).json({
      error: "EMPTY USERNAME",
      code: 2
    });
  }
 
  let user = new User({
    id : req.body.userId,
    name: req.body.userName,
  });
 
  user.save(err => {
    if (err) throw err;
    return res.json({ success: true });
  });
});
 