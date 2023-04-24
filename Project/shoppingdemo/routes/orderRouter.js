const express = require("express");
const orderController = require("../controllers/OrderController");
const router = express.Router();

router.post("/checkout", orderController.checkout);

module.exports = router;
