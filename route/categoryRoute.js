const express=require('express');
const { getHello,postCategory, getAllCategory,CategoryById, getsingleCategory, deleteCategory, updateCategory } = require('../controller/Category');
const{ userById, requireSignin, isAdmin }= require('../controller/user');

const router=express.Router();


router.get('/hello',getHello)
router.post('/postcategory/:userId',requireSignin,isAdmin,postCategory)
router.get('/categorylist',getAllCategory)
router.param('categoryId',CategoryById)
router.get('/read/:categoryId',getsingleCategory)
router.delete('/deletecategory/:categoryId',deleteCategory)
router.put('/updatecategory/:categoryId',updateCategory)//to update use put

router.param('userId',userById)


module.exports=router