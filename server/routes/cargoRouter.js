const Router = require('express')
const router = new Router()
const cargoController = require('../controllres/cargoController')

router.post('/', cargoController.create)

router.get('/', cargoController.getAll)

router.get('/:id', cargoController.getOne)

router.put('/:id', cargoController.change)

router.delete('/:id', cargoController.delete)

module.exports = router