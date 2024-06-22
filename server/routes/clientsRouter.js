const Router = require('express')
const router = new Router()
const clientController = require('../controllres/clientsController')

router.post('/', clientController.create)

router.get('/', clientController.getAll)

router.get('/:id', clientController.getOne)

router.put('/:id', clientController.change)

router.delete('/:id', clientController.delete)



module.exports = router