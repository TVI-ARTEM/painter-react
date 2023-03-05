const Router = require('express')
const router = new Router()
const userRouter = require('./userRouter')
const projectRouter = require('./projectRouter')

router.use('/user', userRouter)
router.use('/project', projectRouter)

module.exports = router