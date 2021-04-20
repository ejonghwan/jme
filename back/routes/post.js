const express = require('express');
const router = express.Router()

const { Post, User, Image, Comment } = require('../models')
const { isLoggedIn } = require('./middlewares')

router.post('/', isLoggedIn, async (req, res, next) => { //POST /post/
    try {
        const post = await Post.create({
            content: req.body.content,
            UserId: req.user.id,
        })
        const fullPost = await Post.findOne({ //합쳐서 돌려주기
            where: { id: post.id },
            include: [{
                model: Image,
            }, {
                model: Comment,
            }, {
                model: User,
            }]
        })
        res.status(201).json(fullPost)
    } catch(error) {
        console.error(error)
        next(error)
    }
})

router.post('/:postId/comment', isLoggedIn, async (req, res, next) => { //POST /post/

    try {
        const post = await Post.findOne({
            where: { id: req.params.postId }
        })

        if(!post) {
            return res.status(403).send('존재하지 않는 게시글')
        }

        const comment = await Comment.create({
            content: req.body.content,
            PostId: req.params.postId
        })

     
        res.status(200).send(comment)
    } catch(error) {
        console.error(error)
        next(error)
    }
})

module.exports = router;