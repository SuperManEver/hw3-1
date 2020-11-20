const express = require('express')
const router = express.Router()
const { products, skills } = require('../data.json')

router.get('/', (req, res, next) => {
  res.render('pages/index', { title: 'Main page', products, skills })
})

router.post('/', (req, res, next) => {
  // TODO: Реализовать функционал отправки письма.
  res.send('Реализовать функционал отправки письма')
})

module.exports = router
