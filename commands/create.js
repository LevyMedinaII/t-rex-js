const chalk = require('chalk')
const fs = require('fs')
let createInquirer = require('../inquirer/create')

let create = async () => {
  let answers = await createInquirer()
  let dir = answers.name

  if (!fs.existsSync(dir)) {
    try {
      fs.mkdirSync(`${process.cwd()}/${dir}`)
      fs.writeFile(`${process.cwd()}/${dir}/config.json`,
        JSON.stringify({ 
          frontend: answers.frontend,
          database: answers.database
        }, null, 4), (err) => {
          if (err) return console.log(err)
          console.log("The file was saved!")
      })
    } catch (err)  {
      console.log(err)
    }
  } else {
    console.log(`Project ${answers.name} already exists`)
  }
}

module.exports = create