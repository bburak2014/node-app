const express=require('express');
const router=express.Router();

const shopController=require('../controller/shop');

router.get('/',shopController.getIndex);
router.get('/data',shopController.getJson);
router.get('/data_SalesDetail',shopController.getJsonSalesDetails);


router.get('/products',shopController.getProducts);
router.get('/products/:productid',shopController.getProduct);
router.get('/categories/:categoryid',shopController.getProductsByCategoryId);

router.get('/card',shopController.getCart);
router.post('/card',shopController.postCart);

router.get('/orders',shopController.getOrders);
 



module.exports=router;