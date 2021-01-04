const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const User = require('../models/user');
const jwt = require('jsonwebtoken')
const db = "mongodb://localhost:27017/eventsdb";


mongoose.connect(db, function (err) {
  if (err) {
    console.error('Error! ' + err)
  } else {
    console.log('Connected to mongodb')
  }
});


function verifyToken(req, res, next) {
  if (!req.headers.authorization) {
    return res.status(401).send('Unauthorized request')
  }
  let token = req.headers.authorization.split(' ')[1]
  if (token === 'null') {
    return res.status(401).send('Unauthorized request')
  }
  let payload = jwt.verify(token, 'secretKey')
  if (!payload) {
    return res.status(401).send('Unauthorized request')
  }
  req.userId = payload.subject
  next()
}

router.get('/events', (req, res) => {
  let events = [
    {
      "_id": "1",
      "name": "Angular: Web Development",
      "description": "2 Days",
      "Teacher": "Hritik Tickoo"
    },
    {
      "_id": "2",
      "name": "Python: Machine Learning",
      "description": "2 Days",
      "Teacher": "Mayur Patil"
    },
    {
      "_id": "3",
      "name": "Machine Learning",
      "description": "2 Days",
      "Teacher": "Vikas More"
    },
    {
      "_id": "4",
      "name": "GoLang",
      "description": "2 Days",
      "Teacher": "Aditya Iparkar"
    },
    {
      "_id": "5",
      "name": "IPhone Programming",
      "description": "2 Days",
      "Teacher": "Mahesh Khairnar"
    },
    {
      "_id": "6",
      "name": "Android Programming",
      "description": "2 Days",
      "Teacher": "Piyush Manohar"
    }
  ]
  res.json(events)
})

router.get('/special', verifyToken, (req, res) => {
  let specialEvents = [
    {
      "_id": "1",
      "name": "IOT",
      "description": "3 Days",
      "Teacher": "Hritik Tickoo"
    },
    {
      "_id": "2",
      "name": "IOS Internals",
      "description": "3 Days",
      "Teacher": "Mayur Patil"
    },
    {
      "_id": "3",
      "name": "LSP",
      "description": "3 Days",
      "Teacher": "Vikas More"
    },
    {
      "_id": "4",
      "name": "Struts",
      "description": "3 Days",
      "Teacher": "Aditya Iparkar"
    },
    {
      "_id": "5",
      "name": "Embedded Programming",
      "description": "3 Days",
      "Teacher": "Piyush Manohar "
    },
    {
      "_id": "6",
      "name": "IOT Workshop",
      "description": "3 Days",
      "Teacher": "Mahesh Khairnar"
    }
  ]
  res.json(specialEvents)
})

router.post('/register', (req, res) => {
  let userData = req.body
  let user = new User(userData)
  user.save((err, registeredUser) => {
    if (err) {
      console.log(err)
    }
    else {
      let payload = { subject: registeredUser._id }
      let token = jwt.sign(payload, 'secretKey')
      res.status(200).send({ token })
    }
  })
})

router.post('/login', (req, res) => {
  let userData = req.body
  User.findOne({ email: userData.email }, (err, user) => {
    if (err) {
      console.log(err)
    }
    else {
      if (user == null) {
        res.status(401).send('Invalid Email.')
      }
      else if (user.password != userData.password) {
        res.status(401).send('Invalid Password.')
      }
      else {
        let payload = { subject: user._id }
        let token = jwt.sign(payload, 'secretKey')
        res.status(200).send({ token })
      }
      // code by sh

      /* if (user != null) 
      {
        if (user.password == userData.password) 
        {
          var token = jwt.sign(user, 'secretKey');
          let res = {
            isSuccess: true,
            message: "success",
            data = 
            {
              userId: user._id,
              email: user.email,
              token: token
            }
          }
          res.status(200).send({ res })
        } else 
        {
          let res = {
            isSuccess: false,
            message: "username or password is wrong",
            data: null
          }
          res.status(401).send({ res })
        }
      } else 
      {
        let res = {
          isSuccess: false,
          message: "Unauthorized user",
          data: null
        }
        res.status(401).send({ res })
      }*/

      //code by sh





    }
  })
})

module.exports = router;