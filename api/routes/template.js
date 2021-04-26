var express = require("express");
const TemplateController = require("../controllers/TemplateController");

var router = express.Router();

router.get("/", TemplateController.logList);
router.get("/:id", TemplateController.logDetail);
router.post("/", TemplateController.logStore);
router.put("/:id", TemplateController.logUpdate);
router.delete("/:id", TemplateController.logDelete);

module.exports = router;