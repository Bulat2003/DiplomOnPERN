const Router = require('express')
const router = new Router()
const managerController = require('../controllres/managerController')

router.post('/', managerController.create)

router.get('/', managerController.getAll)

router.get('/:id', managerController.getOne)

router.put('/:id', managerController.change)

router.delete('/:id', managerController.delete)

module.exports = router