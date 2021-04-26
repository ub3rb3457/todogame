var express = require("express");
const MaterialController = require("../controllers/MaterialController");

var router = express.Router();

router.get("/", MaterialController.materialList);
router.get("/:id", MaterialController.materialDetail);
router.post("/", MaterialController.materialStore);
router.put("/:id", MaterialController.materialUpdate);
router.delete("/:id", MaterialController.materialDelete);

module.exports = router;