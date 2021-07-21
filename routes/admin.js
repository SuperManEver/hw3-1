const express = require('express')
const formidable = require('formidable')
const path = require('path')
const router = express.Router()

const { unlink, rename } = require('../utils')
const { UPLOAD_DIR } = require('../config')
const { DB } = require('../db')
const { schema } = require('../models/skill')

router.get('/', (req, res, next) => {
  res.render('pages/admin', { title: 'Admin page' })
})

router.post('/skills', async (req, res, next) => {
  try {
    await schema.validateAsync(req.body)
    await DB.addSkill(req.body)

    res.redirect('/')
  } catch (err) {
    console.error(err)

    const { details } = err

    const { message } = details[0]
    res.render('pages/admin', { msgskill: message })
  }
})

router.post('/upload', async (req, res, next) => {
  const form = new formidable.IncomingForm()

  form.uploadDir = UPLOAD_DIR

  form.parse(req, async (err, fields, files) => {
    if (err) {
      return next(err)
    }

    const validationResult = validation(fields, files)

    if (validationResult.err) {
      await unlink(files.photo.path)

      return res.render('pages/admin', {
        msgfile: 'valid.status',
      })
    }

    const fileName = path.join(UPLOAD_DIR, files.photo.name)

    try {
      await rename(files.photo.path, fileName)

      await DB.addProduct({
        image: fileName,
        name: files.photo.name,
        price: fields.price,
      })

      res.render('pages/admin', {
        msgfile: 'Картинка успешно загружена',
      })
    } catch (err) {
      console.error(err.message)

      res.render('pages/admin', { msgfile: 'Ошибка при загрузке картинки' })
    }
  })
})

const validation = (fields, files) => {
  if (files.photo.name === '' || files.photo.size === 0) {
    return { status: 'Не загружена картинка!', err: true }
  }
  if (!fields.name) {
    return { status: 'Не указано описание картинки!', err: true }
  }

  if (!fields.price) {
    return { status: 'Не указана цена!', err: true }
  }

  return { status: 'Ok', err: false }
}

module.exports = router
