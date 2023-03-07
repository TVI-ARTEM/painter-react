const Router = require('express')
const router = new Router()

const projectController = require('../controller/projectController')
const authMiddleware = require('../middleware/authMiddleware')

router.post('/create', authMiddleware, projectController.create)
router.post('/remove', authMiddleware, projectController.remove)
router.post('/update', authMiddleware, projectController.update)
router.post('/update-tags', authMiddleware, projectController.updateTags)
router.post('/like', authMiddleware, projectController.like)
router.post('/get', projectController.get)
router.post('/get-all', projectController.getAll)
router.post('/get-all-users', projectController.getAllUsers)
router.post('/get-all-starts', projectController.getAllStarts)

module.exports = router
