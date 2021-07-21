const fs = require('fs')
const path = require('path')
const dotenv = require('dotenv')

if (fs.existsSync(path.join(__dirname, '../.env'))) {
  dotenv.config()
} else {
  console.log('.env file not found, skip dotenv configuration')
}

const { PORT, SMTP_PORT, SMTP_HOST, SMTP_USER, SMTP_PASS } = process.env

const SMPT_CONFIG = {
  mail: {
    subject: 'Сообщение с сайта',
    smtp: {
      host: SMTP_HOST,
      port: SMTP_PORT,
      secure: true,
      auth: {
        user: SMTP_USER,
        pass: SMTP_PASS,
      },
    },
  },
}

const ADMIN_EMAIL = 'admin@example.com'
const ADMIN_PASSWORD = '123321'
const UPLOAD_DIR = path.normalize(
  path.join(process.cwd(), './public', 'upload')
)

module.exports = {
  PORT,
  SMTP_PORT,
  SMTP_HOST,
  SMTP_USER,
  SMTP_PASS,
  SMPT_CONFIG,
  ADMIN_EMAIL,
  ADMIN_PASSWORD,
  UPLOAD_DIR,
}
