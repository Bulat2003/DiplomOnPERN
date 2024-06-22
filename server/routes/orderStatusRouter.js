const Router = require('express')
const router = new Router()
const orderStatusController = require('../controllres/orderStatusController')
const {OrderStatus} = require("../models/models");

router.post('/', orderStatusController.create)

router.get('/', orderStatusController.getAll)

router.get('/:id', orderStatusController.getOne)

router.put('/:id', orderStatusController.change)

router.delete('/:id', orderStatusController.delete)

module.exports = router