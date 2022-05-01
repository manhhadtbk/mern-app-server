var Todos = require('../models/todoModel')

module.exports = function (app) {
   app.get('/api/setupTodos', function (req, res) {

      // setup seed data 
      var seedTodos = [
         {
            text: 'Hoc',
            isDone: false
         },
         {
            text: 'Hoc ReactJs',
            isDone: false
         },
         {
            text: 'viet 1 ung dung',
            isDone: false
         }
      ]

      Todos.create(seedTodos, function (err, results) {
         res.send(results)
      })
   })
}