const express = require('express')
const nodemailer = require('nodemailer')
const router = express.Router()
const { DB } = require('../db')
const { SMTP_USER, SMPT_CONFIG } = require('../config')

router.get('/', async (req, res, next) => {
  const products = await DB.getAllProducts()
  const skills = await DB.getAllSkills()

  res.render('pages/index', { title: 'Main page', products, skills })
})

router.post('/', async (req, res, next) => {
  const products = await DB.getAllProducts()
  const skills = await DB.getAllSkills()

  if (!req.body.name || !req.body.email || !req.body.message) {
    return res.render('pages/index', {
      msgemail: 'Все поля нужно заполнить!',
      products,
      skills,
      status: 'Error',
    })
  }

  const transporter = nodemailer.createTransport(SMPT_CONFIG.mail.smtp)
  const mailOptions = {
    from: `"${req.body.name}" <${req.body.email}>`,
    to: SMTP_USER,
    subject: SMPT_CONFIG.mail.subject,
    status: 'Error',
    text:
      req.body.message.trim().slice(0, 500) +
      `\n Отправлено с: <${req.body.email}>`,
  }

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      return res.render('pages/index', {
        msgemail: 'При отправке письма произошла ошибка!',
        products,
        skills,
        status: 'Error',
      })
    }

    res.render('pages/index', {
      msgemail: 'Письмо успешно отправлено!',
      products,
      skills,
      status: 'Ok',
    })
  })
})

module.exports = router
