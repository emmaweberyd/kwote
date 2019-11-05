const router = require('express').Router();
let Post = require('../models/post.model');

router.route('/').get((req,res) => {
    Post.find()
        .then(posts => res.send(posts))
        .catch(err => res.status(400).send({msg: err}));
});

router.route('/add').post((req,res) => {
    const {quote} = req.body;

    // make sure all fields are non-empty
    if(!quote){
        return res.status(400).send({msg: 'Enter all fields'});
    }

    const newPost = new Post({
        quote
    });

    newPost.save()
    .then(() => res.send({msg: 'Post added!'}))
    .catch(err => res.status(400).send({msg: err}));
    
});

router.delete('/:id', (req, res) => {
    Post.findById(req.params.id)
    .then(post => post.remove())
    .then(() => res.send({msg: 'Post deleted!'}))
    .catch(err => res.status(400).send({msg: err}));
});

module.exports = router;