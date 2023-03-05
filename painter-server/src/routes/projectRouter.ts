const Router = require('express')
const router = new Router()

const projectController = require('../controller/projectController')
const authMiddleware = require('../middleware/authMiddleware')

router.post('/create', authMiddleware, projectController.create)
router.post('/remove', authMiddleware, projectController.remove)
router.post('/update', authMiddleware, projectController.update)
router.post('/get', projectController.get)
router.post('/get-all', projectController.getAll)

module.exports = router
