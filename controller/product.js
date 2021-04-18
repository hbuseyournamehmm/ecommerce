const Product=require('../model/productModel')

exports.postProduct=(req,res)=>{
    let product=new Product({
        product_name:req.body.product_name,
        product_price:req.body.product_price,
        product_quantity:req.body.product_quantity,
        product_rating:req.body.product_rating,
        category:req.body.category,
        product_description:req.body.product_description,

    })
    product.save((error,products)=>{
        if(error || !products){
            return res.status(400).json({error:"somethig went wrong"})
        }
        res.json({products})
    })
}


exports.productList=(req,res)=>{
    Product.find().exec((error,products)=>{
        if (error || !products){
            return res.status(400).json({error:"Products not found"})
        }
        res.json({products})
    })
}
//product by id
exports.ProductById=(req,res,next,id)=>{
    Product.findById(id).exec((error,product)=>{
        if (error || !product){
            return res.status(400).json({error:"product not found"})
        }
        req.product=product
        next()
    })
}
//to show single product

exports.read=(req,res)=>{
    res.json(req.product)
}
//to delete product
exports. deleteProducts= (req, res)=>{
    const product=req.product
    product.remove((error,result)=>{
        if(error || !result){
        return res.status(400).json({error:"failed to delete product"})
        }
        res.json({message:"Product delted"})
    })
}