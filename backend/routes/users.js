const router = require('express').Router();
const jwt = require('jsonwebtoken');
let User = require('../models/user.model');

router.route('/').get((req,res) => {
    User.find()
        .then(users => res.json(users))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req,res) => {
    const {firstname, lastname, email, password} = req.body;

    // make sure all fields are non-empty
    if(!firstname || !lastname || !email || !password){
        return res.status(400).json({msg: 'Enter all fields'});
    }

    // make sure password is long enough
    if(password.length < 8){
        return res.status(400).json({msg: 'Password needs at least 8 characters'});
    }

    // create user if doesn't already exist
    User.findOne({email})
        .then(user =>{
            if(user) return res.status(400).json({msg: 'User already exists'});

            const newUser = new User({
                firstname, 
                lastname, 
                email,
                password
            });

            newUser.save()
            .then(() => res.json({msg: 'User added!'}))
            .catch(err => res.status(400).json('Error: ' + err));
        })
});

router.route('/login').post((req,res) => {
    const {email, password} = req.body;

    User.findOne({email})
    .then( user => {
        if(user) {
            user.comparePassword(password, function(err, isMatch) {
                if(err) throw err;
                if(isMatch) {
                    const payload = {
                        _id: user._id,
                        firstname: user.firstname,
                        lastname: user.lastname,
                        email: user.email
                    }
                    let token = jwt.sign(payload, process.env.SECRET_KEY, {
                        expiresIn: 1440
                    })
                    res.send(token)
                } else {
                    return res.status(400).json({msg: 'User does not exist'});
                }
            });
        } else {
            return res.status(400).json({msg: 'User does not exist'});
        }  
    })
    .catch(err => res.status(400).json('Error: ' + err))
});

module.exports = router;