var Todos = require('../models/todoModel')

function getTodos(res) {
   Todos.find(function (err, todos) {
      if (err) {
         res.status(500).json(err)
      }
      else {
         res.json(todos)
      }
   })
}

module.exports = function (app) {

   // get all todos
   app.get('/api/todos', function (req, res) {

      // Website you wish to allow to connect
      res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');

      // Request methods you wish to allow
      res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

      // Request headers you wish to allow
      res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

      // Set to true if you need the website to include cookies in the requests sent
      // to the API (e.g. in case you use sessions)
      res.setHeader('Access-Control-Allow-Credentials', true);

      getTodos(res)
   })

   // api/todo/1234
   app.get('/api/todo/:id', function (req, res) {

      Todos.findById({ _id: req.params.id }, function (err, todo) {
         if (err) {
            throw err
         } else {
            res.json(todo)
         }
      })
   })



   // create a todo
   app.post('/api/todo', function (req, res) {

      var todo = {
         text: req.body.text,
         isDone: req.body.isDone
      }

      Todos.create(todo, function (err, todo) {
         if (err) {
            throw err
         } else {
            getTodos(res)
         }
      })
   })

   // update todo
   app.put('/api/todo', function (req, res) {
      if (!req.body.id) {
         return res.status(500).send('Id is required')
      } else {
         Todos.update(
            {
               _id: req.body.id

            },
            {
               text: req.body.text,
               isDone: req.body.isDone
            },
            function (err, todo) {
               if (err) {
                  return res.status(500).json(err)
               } else {
                  getTodos(res)
               }
            }
         )
      }
   })

   // delete todo
   app.delete('/api/todo/:id', function (req, res) {
      Todos.remove(
         {
            _id: req.params.id
         },
         function (err, todo) {
            if (err) {
               return res.status(500).json(err)
            } else {
               getTodos(res)
            }
         }
      )
   })
}