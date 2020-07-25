const {Router} = require('express')
const Project = require('../models/Project')
const auth = require('../middleware/auth.middleware.js')
const router = Router()

router.post('/generate', auth, async (req, res) => {
   try {
      const {description, technologies, demoLink, gitLink} = req.body

      const project = new Project({
         description, technologies, demoLink, gitLink, owner: req.user.userId
      })

      await project.save()

      res.status(201).json({ project })

   } catch (e) {
      res.status(500).json({message: 'Что-то пошло не так, попробуйте снова'})
   }
})

router.get('/', auth, async (req, res) => {
   try {
      const projects = await Project.find({owner: req.user.userId})
      res.json(projects)
   } catch (e) {
      res.status(500).json({message: 'Что-то пошло не так, попробуйте снова'})
   }
})

router.delete("/:id", auth, async (req, res)=>{
   try {
      const message = await Project
         .findOneAndDelete({owner: req.user.userId, _id: req.params.id})

      res.json({ message: 'Проект удален' });
   } catch (e) {
      res.status(500).json({message: 'Что-то пошло не так, попробуйте снова'})
   }
});

router.put("/:id", auth, async (req, res)=>{
   try {
      await Project
         .updateOne({owner: req.user.userId, _id: req.params.id}, {
            description: req.body.description,
            technologies: req.body.technologies,
            demoLink: req.body.demoLink,
            gitLink: req.body.gitLink
         })

      res.json({ message: 'Проект обновлен'});
   } catch (e) {
      res.status(500).json({message: 'Что-то пошло не так, попробуйте снова'})
   }
});

/*




*/

module.exports = router
