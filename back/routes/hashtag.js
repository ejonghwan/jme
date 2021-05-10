
const express = require('express');
const router = express.Router();
const { Post, User, Image, Comment, Hashtag } = require('../models');
const { Op } = require('sequelize') 



router.get('/:hashtag', async (req, res, next) => { //posts

    try {
        const where = {} 
        const lastId = parseInt(req.query.lastId, 10); 
        if(lastId) { 
            where.id = { [Op.lt]: lastId } 
            //21 20 19 18 17 16 15 14 13 12(lastId) 12가 라스트 아이디면 11부터 -> 11 10 9 8 7 6 5 4 3 2 1
        }

        const posts = await Post.findAll({ 
            where: where,
            limit: 10, 
           
            order: [
                ['createdAt', 'DESC'],
                [Comment, 'createdAt', 'DESC']
            ], // DESC 내림차순, ASC 오름차순
           
            include: [{
                model: Hashtag,
                where: { id: decodeURIComponent(req.params.hashtag) }
            },{
                model: User,
                // attributes: { exclude: ['password'] },
                attributes: ['id', 'password', 'nickname'], //id만 가져오거나 id / password만 가져오면 에러남  <- 이게 아님 _document.js 오타있던거
            }, {
                model: Image,
            }, {
                model: Comment,
                include: [{
                        model: User,
                        attributes: ['id']
                    }]
            }, {
                model: User, 
                as: 'Likers',
                attributes: ['id'],
            },{
                model: Post, //리트윗한 게시물
                as: 'Retweet',
                include: [{
                    model: User,
                    attributes: ['id', 'nickname']
                }, {
                    model: Image,
                }]
            },]
        })
        // console.log(posts)
        res.status(200).json(posts)
    } catch (error) {
        console.error(error)
        next(error)
    }
    
    
})



// router.get('/:hashtag', async (req, res, next) => { //hashtag/ data

//     try {
//         const where = {} 
//         const lastId = parseInt(req.query.lastId, 10); 
//         if(lastId) { //초기 로딩이 아닐 때
//             where.id = { [Op.lt]: lastId }
//         }

//         const posts = await Post.findAll({ //lastId limit 방식.
//             where: where,
//             limit: 10, 
//             order: [
//                 ['createdAt', 'DESC'],
//                 [Comment, 'createdAt', 'DESC']
//             ], 
//             include: [{
//                 model: Hashtag,
//                 where: { id: decodeURIComponent(req.params.hashtag) } // 이 조건이랑 위 where이 맞는 걸 db에서 찾아옴
//             },{
//                 model: User,
//                 attributes: { exclude: ['password'] },
//             }, {
//                 model: Image,
//             }, {
//                 model: Comment,
//                 include: [{
//                         model: User,
//                         attributes: ['id', 'nickname']
//                     }]
//             }, {// 불러오는 데이터에도 좋아요한 뎁스 넣어주기
//                 model: User, //좋아요 한 유저
//                 as: 'Likers', // db model에서 만든 as 꼭 넣어주기
//                 attributes: ['id'],
//             },{
//                 model: Post, //리트윗한 게시물
//                 as: 'Retweet', //리트윗한 게시물이 post.Retweet으로 담김
//                 include: [{
//                     model: User,
//                     attributes: ['id', 'nickname']
//                 }, {
//                     model: Image,
//                 }]
//             },]
//         })
//         // console.log(posts)
//         res.status(200).json(posts)
//     } catch (error) {
//         console.error(error)
//         next(error)
//     }
    
    
// })


module.exports = router

