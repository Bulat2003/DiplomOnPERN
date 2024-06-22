const Router = require('express')
const router = new Router()
const cargoTypeController = require('../controllres/cargoTypeController')

router.post('/', cargoTypeController.create)

router.get('/', cargoTypeController.getAll)

router.get('/:id', cargoTypeController.getOne)

router.put('/:id', cargoTypeController.change)

router.delete('/:id', cargoTypeController.delete)

module.exports = router