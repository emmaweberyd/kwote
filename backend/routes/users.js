const router = require('express').Router();
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
        });
});

module.exports = router;