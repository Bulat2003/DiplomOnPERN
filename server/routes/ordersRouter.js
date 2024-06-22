const Router = require('express')
const router = new Router()
const ordersController = require('../controllres/ordersController')

router.post('/', ordersController.create)

router.get('/', ordersController.getAll)
router.get('/:id', ordersController.getOne)

router.put('/:id', ordersController.change)

router.delete('/:id', ordersController.delete)

router.get('/client/:clientId', ordersController.getByClientId);

router.get('/driver/:driverId', ordersController.getByDriverId);

module.exports = router