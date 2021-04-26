const User = require('../model/userModel')
const jwt = require('jsonwebtoken')
//for authentication use jwt
const expressJwt = require('express-jwt')
//for authorization use express-jwt


exports.postUser = (req, res) => {
    let user = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
    })

    user.save((error, users) => {
        if (!users || error) {
            return res.status(400).json({ error: "unabale to create an account" })
        }
        res.json({ users })
    })
}

exports.signIn = (req, res) => {
    const { email, password } = req.body
    //at first check mail if it exist in database or not
    User.findOne({ email }, (error, user) => {
        if (!user || error) {
            return res.status(400).json({ error: "sorry the provided email doesnot found in our system" })
        }

        if (!user.authenticate(password)) {
            return res.status(400).json({ error: "email and password doesnot match" })
        }
        //new generate token with id and jwt secret
        const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET)
        //persist the token with expiry date using cookie
        res.cookie('t', token, { expire: Date.now() + 999999 })
        //return response with user and token to frontend
        const { _id, name, email, role } = user
        return res.json({ token, user: { name, email, _id, role } })

    })
}


//for authorization
exports.requireSignin = expressJwt({
    secret: process.env.JWT_SECRET,
    algorithms: ["HS256"],
    userProperty: "auth",//auth vaneko authentication
})

//to get user by id
exports.userById = (req, res, next, id) => {
    User.findById(id).exec((error, user) => {
        if (error || !user) {
            return res.status(400).json({ error: "User not found" })
        }
        req.user = user
        next()
    })
}

//to show single user details

exports.read = (req, res) => {
    res.json(req.user)

}

//signout
exports.signOut= (req, res)=>{
    res.clearCookie ('t')
    res.json({message:"Signout success"})
}