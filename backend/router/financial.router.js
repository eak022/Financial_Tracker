const financialController = require("../controllers/financial.controller");
const express = require("express");
const router = express.Router();

router.post(
    "/",
    financialController.create
);

router.get("/", financialController.getAll);
router.get("/:id", financialController.getById);
router.get("/user/:userID", financialController.findAllByUserId);
router.put(
    "/:id",
    financialController.update
);
router.delete(
    "/:id",
    financialController.delete
);

module.exports = router;