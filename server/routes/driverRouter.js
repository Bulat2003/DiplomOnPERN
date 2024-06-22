const Router = require('express')
const router = new Router()
const driverController = require('../controllres/driverController')

router.post('/', driverController.create)
    
router.get('/', driverController.getAll)

router.get('/:id', driverController.getOne)

router.put('/:id', driverController.change)

router.delete('/:id', driverController.delete)



module.exports = router