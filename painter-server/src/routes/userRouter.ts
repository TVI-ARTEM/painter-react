const Router = require('express')
const router = new Router()

const userController = require('../controller/userController')
const authMiddleware = require('../middleware/authMiddleware')

router.post('/registration', userController.registration)
router.post('/login', userController.login)
router.post('/logout', authMiddleware, userController.logout)
router.post('/update', authMiddleware, userController.update)
router.get('/auth', authMiddleware, userController.auth)

module.exports = router
