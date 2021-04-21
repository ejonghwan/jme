

const express = require('express');
const router = express.Router();
const { Post, User, Image, Comment } = require('../models');



router.get('/', async (req, res, next) => { //posts

    try {
        const posts = await Post.findAll({ //lastId limit 방식
            limit: 10, //10개만 가져와라
            // offset: 100, // 101~ 110번까지 가져와라. 근데 문제가 있음, 중간에 추가됐을 때 
            order: [
                ['createdAt', 'DESC'],
                [Comment, 'createdAt', 'DESC']
            ], // DESC 내림차순, ASC 오름차순
            // where: { id: lastId }, //조건 where: {userId: 1} 1번 아이디를 가진 사람의 글을 모두 가져와라 
            include: [{
                model: User,
                attributes: { exclude: ['password'] },
            }, {
                model: Image,
            }, {
                model: Comment,
                include: [{
                        model: User,
                        attributes: ['id', 'nickname']
                    }]
            }, {// 불러오는 데이터에도 좋아요한 뎁스 넣어주기
                model: User, //좋아요 한 유저
                as: 'Likers', // db model에서 만든 as 꼭 넣어주기
                attributes: ['id'],
            }]
        })
        console.log(posts)
        res.status(200).json(posts)
    } catch (error) {
        console.error(error)
        next(error)
    }
    
    
})


module.exports = router

