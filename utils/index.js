const { stat, mkdir, unlink, rename } = require('fs/promises')
const { UPLOAD_DIR } = require('../config')

exports.stat = stat
exports.mkdir = mkdir
exports.unlink = unlink
exports.rename = rename

exports.initUploadDir = async () => {
  try {
    await stat(UPLOAD_DIR)
  } catch (err) {
    await mkdir(UPLOAD_DIR)
  }
}
