const express=require('express')
const {postProduct, productList,ProductById,read}=require('../controller/product');
const router=express.Router();


router.get('/productlist',productList)
router.post('/postproduct',postProduct)
router.param('productId',ProductById)
router.get('/singleproduct/:productId',read)


module.exports=router