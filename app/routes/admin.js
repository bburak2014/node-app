const express = require("express");
const router = express.Router();
const adminController=require('../controller/admin');
 

router.get("/add_product",adminController.getAddProducts );
router.post("/add_product",adminController.postAddProducts );
router.get("/SalesReport",adminController.getReport );

router.get("/products/:productid",adminController.getEditProducts );
router.post("/products",adminController.postEditProducts );
router.get("/products",adminController.getProducts );
router.post("/delete-product",adminController.postDeleteProduct)

module.exports = router;

