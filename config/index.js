var configValues = require('./config.json')

module.exports = {
   getDbConnectionString: function () {
      return `mongodb+srv://${configValues.username}:${configValues.password}@cluster0.znprm.mongodb.net/node-todos?retryWrites=true&w=majority`
   }
}