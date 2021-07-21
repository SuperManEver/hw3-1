const path = require('path')
const util = require('util')
const fs = require('fs')

const dataFilePath = path.normalize(path.join(__dirname, 'data.json'))

const readFile = util.promisify(fs.readFile)

class DB {
  constructor() {
    this.init()
  }

  async init() {
    const file = await readFile(dataFilePath, 'utf8')

    this.database = JSON.parse(file)
  }

  getAllProducts() {
    const { products = [] } = this.database || {}

    return new Promise((resolve) => resolve(products))
  }

  getAllSkills() {
    const { skills = [] } = this.database || {}

    return new Promise((resolve) => resolve(skills))
  }

  addSkill(params) {
    const { age, concerts, cities, years } = params

    return new Promise((resolve) => {
      const newItem = {
        number: concerts,
        text: cities,
        age,
        years,
      }

      this.database.skills.push(newItem)

      resolve(newItem)
    })
  }

  addProduct(product) {
    return new Promise((resolve) => {
      this.database.products.push(product)

      resolve(product)
    })
  }

  close() {
    this.database = null
  }
}

exports.DB = new DB()
