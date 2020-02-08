const {Router} = require('express')
const Video = require('../models/Video')
const auth = require('../middleware/auth.middleware.js')
const shortid = require('shortid')
const router = Router()

/*router.post('/generate', auth, async (req, res) => {
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
   try {
      const message = await Todo
         .findOneAndDelete({owner: req.user.userId, _id: req.params.id})

      res.json({ message });
   } catch (e) {
      res.status(500).json({message: 'Что-то пошло не так, попробуйте снова'})
   }
});

router.put("/:id", auth, async (req, res)=>{
   try {
      const message = await Todo
         .updateOne({owner: req.user.userId, _id: req.params.id}, { title: req.body.title})

      res.json({ message });
   } catch (e) {
      res.status(500).json({message: 'Что-то пошло не так, попробуйте снова'})
   }
});

router.put("/:id/completed", auth, async (req, res)=>{
   try {
      const message = await Todo
         .updateOne({owner: req.user.userId, _id: req.params.id}, { completed: !!req.body.completed})
      res.json({ message });
   } catch (e) {
      res.status(500).json({message: 'Что-то пошло не так, попробуйте снова'})
   }
});*/

module.exports = router
