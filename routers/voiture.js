const express = require('express')
const router = express.Router()
const voitureCtrl = require('../controllers/voitureCtrl')

router.post('/', voitureCtrl.create);
router.put("/:id", voitureCtrl.update);
router.get("/", voitureCtrl.getAll)
router.get("/:id", voitureCtrl.getOne)
router.get("/getByName/:name", voitureCtrl.getByName)
router.delete("/:id", voitureCtrl.delete)

module.exports = router;