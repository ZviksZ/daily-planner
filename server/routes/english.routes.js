const {Router} = require('express')
const English = require('../models/English')
const auth = require('../middleware/auth.middleware.js')
const router = Router()

router.post('/generate', auth, async (req, res) => {
   try {
      const {wordEng, wordRu} = req.body

      const englishItem = new English({
         wordEng, wordRu, owner: req.user.userId
      })

      await englishItem.save()

      res.status(201).json({ englishItem })

   } catch (e) {
      res.status(500).json({message: 'Что-то пошло не так, попробуйте снова'})
   }
})

router.get('/', auth, async (req, res) => {
   try {
      const englishItems = await English.find({owner: req.user.userId})
      res.json(englishItems)
   } catch (e) {
      res.status(500).json({message: 'Что-то пошло не так, попробуйте снова'})
   }
})

router.delete("/:id", auth, async (req, res)=>{
   try {
      const message = await English
         .findOneAndDelete({owner: req.user.userId, _id: req.params.id})

      res.json({ message });
   } catch (e) {
      res.status(500).json({message: 'Что-то пошло не так, попробуйте снова'})
   }
});
/*
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
