const router = require('express').Router();
const auth = require('../middleware/auth');
let Post = require('../models/post.model');

router.get('/', auth, (req,res) => {
    Post.find()
        .then(posts => res.json(posts))
        .catch(err => res.status(400).send({msg: err}));
});

router.post('/add', auth, (req,res) => {
    const {quote, quotee} = req.body;

    // make sure all fields are non-empty
    if(!quote){
        return res.status(400).send({msg: 'Enter all fields'});
    }

    const newPost = new Post({quote, quotee});

    newPost.save()
    .then(post => res.json(post))
    .catch(err => res.status(400).send({msg: err}));
    
});

router.delete('/:id', auth, (req, res) => {
    Post.findById(req.params.id)
    .then(post => post.remove())
    .then(() => res.send({msg: 'Post deleted!'}))
    .catch(err => res.status(400).send({msg: err}));
});

module.exports = router;