exports.productValidation= (req, res, next)=>{
    req.check('product_name','Product name is required').notEmpty()
    
    req.check('product_price','Product price is required').notEmpty()
    .isNumeric()
    .withMessage('Price only contains numeric value')

    req.check('product_quantity','Quantity must be required').notEmpty()
    .isNumeric()
    .withMessage('Quantity must be numeric value only')

    req.check('category','Category is required').notEmpty()

    req.check('product_description','Product Descrioption is required').notEmpty()
    .isLength({
        min:25
    })
    .withMessage('Description must be more than 25 characters')
    const errors=req.validationErrors();
	if(errors){
		const firstError=errors.map(error=>error.msg)[0];
		return res.status(400).json({error:firstError})
	}
	next();

    
}

exports.userValidation=(req,res,next)=>{
    req.check('name','Name is required').notEmpty()

    req.check('email','Email is required').notEmpty()
    .isEmail()
    .withMessage('Invalid email')

    req.check('password','Password is required').notEmpty()
    
    .isLength({
        min:8

    })
    .withMessage('Password must be more than 8 caharacters')

    const errors=req.validationErrors();
	if(errors){
		const firstError=errors.map(error=>error.msg)[0];
		return res.status(400).json({error:firstError})
	}
	next();


}