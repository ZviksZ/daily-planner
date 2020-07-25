const {Router} = require('express')
const Pattern = require('../models/Pattern')
const auth = require('../middleware/auth.middleware.js')
const shortid = require('shortid')
const router = Router()

router.post('/generate', auth, async (req, res) => {
   try {
      const {title, description} = req.body
      const code = shortid.generate()

      const pattern = new Pattern({
         title, description, code, owner: req.user.userId
      })

      await pattern.save()

      res.status(201).json({ pattern })

   } catch (e) {
      res.status(500).json({message: 'Что-то пошло не так, попробуйте снова'})
   }
})

router.get('/', auth, async (req, res) => {
   try {
      const patterns = await Pattern.find({owner: req.user.userId})
      res.json(patterns)
   } catch (e) {
      res.status(500).json({message: 'Что-то пошло не так, попробуйте снова'})
   }
})

router.delete("/:id", auth, async (req, res)=>{
   try {
      const message = await Pattern
         .findOneAndDelete({owner: req.user.userId, _id: req.params.id})

      res.json({ message: 'Паттерн удален' });
   } catch (e) {
      res.status(500).json({message: 'Что-то пошло не так, попробуйте снова'})
   }
});

router.put("/:id", auth, async (req, res)=>{
   try {
      await Pattern
         .updateOne({owner: req.user.userId, _id: req.params.id}, { title: req.body.title, description: req.body.description})

      res.json({ message: 'Паттерн обновлен'});
   } catch (e) {
      res.status(500).json({message: 'Что-то пошло не так, попробуйте снова'})
   }
});

module.exports = router
