const {Router} = require('express')
const Todo = require('../models/Todo')
const auth = require('../middleware/auth.middleware.js')
const shortid = require('shortid')
const router = Router()

router.post('/generate', auth, async (req, res) => {
   try {
      const {title} = req.body
      const code = shortid.generate()

      const todo = new Todo({
         title, code, owner: req.user.userId
      })

      await todo.save()

      res.status(201).json({ todo })

   } catch (e) {
      res.status(500).json({message: 'Что-то пошло не так, попробуйте снова'})
   }
})

router.get('/', auth, async (req, res) => {
   try {
      const todos = await Todo.find({owner: req.user.userId})
      res.json(todos)
   } catch (e) {
      res.status(500).json({message: 'Что-то пошло не так, попробуйте снова'})
   }
})

router.delete("/:id", auth, async (req, res)=>{
   console.log(req)
   const message = await Todo
      .findByIdAndRemove({owner: req.user.userId, _id: req.params.id})
      .then(() => 'Todo deleted');

   res.json({ message });
});

/*router.update("/:id", auth, async (req, res)=>{
   console.log(req)
   const message = await Todo
      .findByIdAndRemove({owner: req.user.userId, _id: req.params.id})
      .then(() => 'Todo deleted');

   res.json({ message });
});*/

module.exports = router