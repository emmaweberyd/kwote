const router = require('express').Router();
const jwt = require('jsonwebtoken');
let User = require('../models/user.model');
const auth = require('../middleware/auth');

router.route('/').get((req,res) => {
    User.find()
        .then(users => res.send(users))
        .catch(err => res.status(400).send({msg: err}));
});

router.route('/add').post((req,res) => {
    const {firstname, lastname, email, password} = req.body;

    // make sure all fields are non-empty
    if(!firstname || !lastname || !email || !password){
        return res.status(400).send({msg: 'Enter all fields'});
    }

    // make sure password is long enough
    if(password.length < 8){
        return res.status(400).send({msg: 'Password needs at least 8 characters'});
    }

    // create user if doesn't already exist
    User.findOne({email})
        .then(user =>{
            if(user) return res.status(400).send({msg: 'User already exists'});

            const newUser = new User({
                firstname, 
                lastname, 
                email,
                password
            });

            newUser.save()
            .then(user => {
                const payload = {
                    _id: user._id,
                    firstname: user.firstname,
                    lastname: user.lastname,
                    email: user.email
                }
                let token = jwt.sign(payload, process.env.SECRET_KEY, {
                    expiresIn: 1440
                })
                res.json({
                    token,
                    user: payload
                });
            })
            .catch(err => res.status(400).send({msg: err}));
        })
});

router.post('/auth', (req,res) => {
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
                        //expiresIn: 1440
                    })
                    res.json({
                        token,
                        user: payload
                    });
                } else {
                    return res.status(400).send({msg: 'User does not exist'});
                }
            });
        } else {
            return res.status(400).send({msg: 'User does not exist'});
        }  
    })
    .catch(err => res.status(400).send({msg: err}))
});

router.get('/auth', auth, (req,res) => {
    User.findById(req.user._id)
        .select('-password') // to not return password
        .then(user => res.json(user));
});

module.exports = router;