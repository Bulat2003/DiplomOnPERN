const Router = require('express')
const router = new Router()
const payStatusController = require('../controllres/payStatusController')

router.post('/', payStatusController.create)

router.get('/', payStatusController.getAll)

router.get('/:id', payStatusController.getOne)

router.put('/:id', payStatusController.change)

router.delete('/:id', payStatusController.delete)

module.exports = router