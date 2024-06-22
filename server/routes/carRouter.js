const Router = require('express')
const router = new Router()
const carController = require('../controllres/carController')
const checkRole = require('../middleware/checkRoleMiddleware')

router.post('/', carController.create)

router.get('/', carController.getAll)

router.get('/:id', carController.getOne)

router.put('/:id', carController.change)

router.delete('/:id', carController.delete)

module.exports = router