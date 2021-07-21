const express = require('express')
const router = express.Router()

const { ADMIN_EMAIL, ADMIN_PASSWORD } = require('../config')

router.get('/', (req, res, next) => {
  res.render('pages/login', { title: 'SigIn page' })
})

router.post('/', (req, res, next) => {
  const { email, password } = req.body

  if (!email || !password) {
    res.render('pages/login', { msglogin: 'Все поля должны быть заполнены!' })
  }

  if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
    res.redirect('/admin')
  }

  res.render('pages/login', {
    msglogin: 'Не верная почта или пароль',
  })
})

module.exports = router
