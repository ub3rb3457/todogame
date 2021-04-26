var express = require("express");
const LogController = require("../controllers/LogController");

var router = express.Router();

router.get("/", LogController.logList);
router.get("/:id", LogController.logDetail);
router.post("/", LogController.logStore);
router.put("/:id", LogController.logUpdate);
router.delete("/:id", LogController.logDelete);

module.exports = router;