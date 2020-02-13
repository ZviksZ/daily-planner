const {Router} = require('express')
const Video = require('../models/Video')
const auth = require('../middleware/auth.middleware.js')
const router = Router()

router.post('/generate', auth, async (req, res) => {
   try {
      const {link, name, channelTitle, previewImg} = req.body

      const video = new Video({
         link, name, channelTitle, previewImg, owner: req.user.userId
      })

      await video.save()

      res.status(201).json({ video })

   } catch (e) {
      res.status(500).json({message: 'Что-то пошло не так, попробуйте снова'})
   }
})

router.get('/', auth, async (req, res) => {
   try {
      const videos = await Video.find({owner: req.user.userId})
      res.json(videos)
   } catch (e) {
      res.status(500).json({message: 'Что-то пошло не так, попробуйте снова'})
   }
})
router.put("/:id", auth, async (req, res)=>{
   try {
      const message = await Video
         .updateOne({owner: req.user.userId, _id: req.params.id}, { status: req.body.status})

      res.json({ message });
   } catch (e) {
      res.status(500).json({message: 'Что-то пошло не так, попробуйте снова'})
   }
});
router.delete("/:id", auth, async (req, res)=>{
   try {
      const message = await Video
         .findOneAndDelete({owner: req.user.userId, _id: req.params.id})

      res.json({ message });
   } catch (e) {
      res.status(500).json({message: 'Что-то пошло не так, попробуйте снова'})
   }
});

module.exports = router
