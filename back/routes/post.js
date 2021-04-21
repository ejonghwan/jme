const express = require('express');
const router = express.Router()

const { Post, User, Image, Comment } = require('../models');
const { isLoggedIn } = require('./middlewares')

// post 게시물 db에 추가하고 응답하는  
router.post('/', isLoggedIn, async (req, res, next) => { //POST /post/
    try {
        const post = await Post.create({ //db에 생성
            content: req.body.content,
            UserId: req.user.id,
        })
        const fullPost = await Post.findOne({ //합쳐서 돌려주기
            where: { id: post.id },
            include: [{
                model: Image,
            }, {
                model: Comment,
                include: [{
                    model: User, // 코멘트 작성자 
                    attributes: ['id', 'nickname'],
                }]
            }, {
                model: User, // 게시글 작성자
                attributes: ['id', 'nickname'],
            }, {
                model: User, //좋아요 한 유저
                as: 'Likers', // db model에서 만든 as 꼭 넣어주기
                attributes: ['id'],
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
            PostId: parseInt(req.params.postId, 10),
            UserId: req.user.id,
        })

        const fullComment = await Comment.findOne({
            where: { id: comment.id },
            include: [{
                model: User,
                attributes: ['id', 'nickname'],
            }],
        })

     
        res.status(200).json(fullComment)
    } catch(error) {
        console.error(error)
        next(error)
    }
})


router.patch('/:postId/like', isLoggedIn, async (req, res, next) => { // PATCH / post/1/like
    try {
        const post = await Post.findOne({
            where: { id: req.params.postId },
        })

        if(!post) {
            return res.status(403).send('게시글이 없습니다')
        }

        await post.addLikers(req.user.id) // 시퀄 post model에서 만든 관계 때문에 이 함수가 생김 
        res.status(200).json({ PostId: post.id, UserId: req.user.id })

    } catch(error) {
        console.error(error)
        next(error)
    }
})


router.delete('/:postId/unlike', isLoggedIn, async (req, res, next) => {
    try {
        const post = await Post.findOne({
            where: { id: req.params.postId }
        })

        if(!post) {
            return res.status(403).send('게시글이 없습니다')
        }

        await post.removeLikers(req.user.id)
        res.status(200).json({ PostId: post.id, UserId: req.user.id })

    } catch(error) {
        console.error(error)
        next(error)
    }
})


router.delete('/', (req, res) => { // DELETE /post
    res.json({ id: 1 })
});

module.exports = router;