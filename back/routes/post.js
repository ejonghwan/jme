const express = require('express');
const router = express.Router()

const { Post, User, Image, Comment } = require('../models');
const { isLoggedIn } = require('./middlewares')

// post 게시물 db에 추가하고 응답하는  
router.post('/', isLoggedIn, async (req, res, next) => { //POST /post/
    try {
        const post = await Post.create({ //db에 생성
            content: req.body.content,
            UserId: req.user.id, //passport 중에 deserializeUser함수에서 라우터가 실행할때마다 req.user에 아이디를 넣어줌
        })
        const fullPost = await Post.findOne({ //합쳐서 돌려주기
            where: { id: post.id },
            include: [
                {
                    model: Image,
                }, 
                {
                    model: Comment,
                    include: [
                        {
                            model: User, // 코멘트 작성자 
                            attributes: ['id', 'nickname'],
                        }
                    ]
                }, 
                {
                    model: User, // 게시글 작성자
                    attributes: ['id', 'nickname'],
                }, 
                {
                    model: User, //좋아요 한 유저
                    as: 'Likers', // db model에서 만든 as 꼭 넣어주기
                    attributes: ['id'],
                }
            ]
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

        //만들고
        const comment = await Comment.create({
            content: req.body.content,
            PostId: parseInt(req.params.postId, 10),
            UserId: req.user.id,
        })

        // 만든거 찾아서보내주고 
        const fullComment = await Comment.findOne({
            where: { id: comment.id },
            include: [{
                model: User,
                attributes: ['id', 'nickname'],
            }],
        })

     
        res.status(200).json(fullComment) //클라이언트에 응답해주고 
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


// findOne findAll destroy create
router.delete('/:postId/delete', isLoggedIn, async (req, res, next) => { // DELETE /post
    try {
        await Post.destroy({ // 시퀄라이즈에선 제거할때 destroy 씀
            where: { //조건
                id: req.params.postId,
                UserId: req.user.id, //Post안에 UserId가 로그인한 내 아이디인 게시물만 삭제할 수 있게 필터하나 걸어줌. 중요
            }
        })

        // if(!post) {
        //     return res.status(401).send('게시물이 없습니다.')
        // }

        // await Post.removePosts(post.id)
        res.status(200).json({ PostId: parseInt(req.params.postId, 10) })//params는 문자열임
        
    } catch(error) {
        console.error(error);
        next(error);
    }
    
});

module.exports = router;