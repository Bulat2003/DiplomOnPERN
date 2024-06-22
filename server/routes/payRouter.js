const Router = require('express')
const router = new Router()
const payController = require('../controllres/payController')

router.post('/', payController.create)

router.get('/', payController.getAll)

router.get('/:id', payController.getOne)

router.put('/:id', payController.change)

router.delete('/:id', payController.delete)

module.exports = router