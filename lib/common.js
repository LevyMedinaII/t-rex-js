const fse = require('fs-extra')
const chalk = require('chalk')

module.exports = function () {
    this.capitalize = ([first, ...rest]) => first.toUpperCase() + rest.join('')

    this.replaceString = (file, target, value) => {
        try {
            let data = fse.readFileSync(file, 'utf8')
            let result = data.replace(target, value)
            fse.writeFileSync(file, result, 'utf8')
        } catch (err) {
            throw err
        }
    }

    this.writeJsonWithDisplay = (location, obj) => {
        fse.writeJsonSync(location, obj, { spaces: 4 })
        console.log(chalk.bgGreen(chalk.bold(' CREATE ')), location)
    }
    
    this.copyWithDisplay = (target, endpoint) => {
        fse.copySync(target, endpoint)
        console.log(chalk.bgGreen(chalk.bold(' CREATE ')), endpoint)
    }

    this.createDirectoryWithDisplay = (path) => {
        fse.ensureDirSync(path)
        console.log(chalk.bgGreen(chalk.bold(' CREATE ')), path)
    }
}