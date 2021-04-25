const express = require('express');
const { User, Post } = require('../models') //module에 만든 User db
const bcrypt = require('bcrypt');
// const post = require('../models/post');
const router = express.Router()

const passport = require('passport');
const user = require('../models/user');
const db = require('../models');

const { isLoggedIn, isNotLoggedIn } = require('./middlewares');


// 새로고침 시 cookie 사용자 정보 복구
router.get('/', async (req, res, next) => {
    try{
        if(req.user) { //req.user가 있을 때만 응답을 해줌. 없으면 널 
            const user = await User.findOne({
                where: { id: req.user.id },
                include: [{ //db에 연결한 관계들을 인클루드에 그대로 가져오면 됨
                    model: Post, //hasMany라서 model: Post가 me.Posts가 됨. models의 user에 post 한명한테 묶어놓은 관계형에있음
                }, {
                    model: User,
                    as: 'Followings', //as썻으면 as 써줘야됨
                }, {
                    model: User,
                    as: 'Followers',
                }]
            })
            res.status(200).json(user)
        } else {
            res.status(200).json(null)
        }
        
    } catch(error) {
        console.error(error)
        next(error)
    }
})

// 로그인 인증
router.post('/login', isNotLoggedIn,  async (req, res, next) => {
    passport.authenticate('local', (serverErr, user, clientErr) => {
        // console.log('req.body ? : ', req.body)
        // local을 먼저 실행해서 LocalStrategy local에 이부분을 먼저 실행해주고 그다음 콜백부분을 실행
        // 1. 서버에러, 2. 유저정보, 3. 클라이언트에러 
        if(clientErr) {
            console.error(clientErr)
            return res.status(403).send(clientErr.reason)
        }

        if(serverErr) {
            console.error(serverErr)
            next(serverErr) //user.reason은 local에서 적은 유저안에 리즌
        }

        // 우리 로그인에서 로그인이 다 성공처리되면 passport에서 한버 더 로그인처리를 함
        return req.login(user, async(loginErr) => { 
            
            if(loginErr) { // 이건 혹시나 passport에서 에러날까봐
                console.log(loginErr)
                return next(loginErr)
            }

            //res.setHeader('Cookie', '세션에서 암호화된 정보') 
            const fullUserWithoutPassword = await User.findOne({
                where: { id: user.id},
                // attributes: ['id', 'nickname', 'email'],
                attributes: { exclude: ['password'] }, //password만 빼고 보낸다는 의미

                include: [{ //db에 연결한 관계들을 인클루드에 그대로 가져오면 됨
                    model: Post, //hasMany라서 model: Post가 me.Posts가 됨. models의 user에 post 한명한테 묶어놓은 관계형에있음
                }, {
                    model: User,
                    as: 'Followings', //as썻으면 as 써줘야됨
                }, {
                    model: User,
                    as: 'Followers',
                }]
            })
            return res.status(200).json(fullUserWithoutPassword)
            // return res.status(200).json(user) //cookie랑 사용자 정보랑 프론트로 보내줌
        })

    })(req, res, next)
})

//가입
router.post('/', isNotLoggedIn, async (req, res, next) => { //POST /user/
    // console.log('req? : ', req )
    try {
        // 중복찾기
        const exUser = await User.findOne({
            where: { //where 조건
                email: req.body.email,
            }
        })
        //중복이라면 
        if(exUser) {
            // status(403)은 간단하게 상태를 보낼수있다
            //요청 / 응답은 "헤더"(상태, 용량, 시간, 쿠키).  "바디"(데이터)로 구성    
            return res.status(403).send('이미 사용중인 아이디')
        }


        const hashedPassword = await bcrypt.hash(req.body.password, 10)
        await User.create({
            email: req.body.email, //body는 signup action. 
            nickname: req.body.nickname,
            password: hashedPassword,
        });

        //프론트를 프록시로 허용하게끔 하거나 npm i cors
        // res.setHeader('Access-Control-Allow-Origin', '*')



        //200 성공 300리다이렉트 400클라이언트 요청  500서버처리에러
        res.status(201).send('ok');
    } catch(error) {
        console.error(error)
        next(error) //express가 error 처리하게 보내줌 
    }
    
})

router.post('/logout', isLoggedIn, (req, res, next) => {
    // req.user //이미 로그인 한 상태에선 req에 내 정보가 들어있음.
    req.logout();
    req.session.destroy();
    res.send('ok')
})


// nickname 수정
router.patch('/nickname', isLoggedIn, async (req, res, next) => {
    try {
        await User.update({ // 수정해라 update
                nickname: req.body.nickname, //프론트에서 넘어온 아이디를 .위로 
            }, {
                where: { id: req.user.id } //조건. 내 아이디의 .위로
            })

        res.status(200).json({ nickname: req.body.nickname })
    } catch(error) {
        console.error(error)
        next(error)
    }
})

router.patch('/:userId/follow', isLoggedIn, async (req, res, next) => {
    try {
        const user = await User.findOne({
            where: { id: req.params.userId }
        })

        // const fullUser = await User.findOne({
        //     where: { id: user.id },
        //     include: [{
        //         model: User,
        //         attributes: ['id', 'nickname'],
        //         as: 'Followers',
        //     }]
        // })

        if(!user) {
            return res.status(403).send('유저가 없습니다')
        } 

        // user.addFollowers(fullUser)
        // res.status(200).json(fullUser)
        await user.addFollowers(req.user.id)
        res.status(200).json({ UserId: parseInt(req.params.userId, 10) })

        
    } catch(error) {
        console.error(error)
        next(error)
    }
})


router.delete('/:userId/unfollow', isLoggedIn, async (req, res, next) => {
    try {
        const user = await User.findOne({
            where: { id: req.params.userId }
        })
    
        if(!user) {
            return res.status(403).send('유저가 없습니다')
        }
    
        await user.removeFollowers(req.user.id)
        res.status(200).json({ UserId: parseInt(req.params.userId) })
        
    } catch(error) {
        console.error(error)
        next(error)
    }

})

router.get('/followers', isLoggedIn, async (req, res, next) => {
    try {
        const user = await User.findOne({
            where: { id: req.user.id },
            // include: [{
            //     model: User,
            //     attributes: ['id', 'nickname'],
            //     as: 'Followers',
            // }]
        })

        if(!user) {
            return res.status(403).send('유저가 없습니다')
        } 

        
        const followers = await user.getFollowers()
        console.log(followers)
        res.status(200).json(followers)
        // res.status(200).json([{id: 1}])

        
    } catch(error) {
        console.error(error)
        next(error)
    }
})


router.get('/followings', isLoggedIn, async (req, res, next) => {
    try {
        const user = await User.findOne({
            where: { id: req.user.id },
            // include: [{
            //     model: User,
            //     attributes: ['id', 'nickname'],
            //     as: 'Followings',
            // }]
        })
        if(!user) {
            return res.status(403).send('유저가 없습니다')
        } 
        const followings = await user.getFollowings()
        res.status(200).json(followings)

        
    } catch(error) {
        console.error(error)
        next(error)
    }
})


module.exports = router;



// {
//     "id":10,
//     "email":"whdghks1@naver.com",
//     "nickname":"whdghks1",
//     "password":"$2b$10$ywUt7l89XqdOWszSCJucd.LGcuGcDdMOjg4cyK1YO8LZ2BE757yFS",
//     "createdAt":"2021-04-24T05:50:18.000Z",
//     "updatedAt":"2021-04-24T05:50:18.000Z",
//     "Followers":[
//         {
//             "id":10,
//             "nickname":"whdghks1",
//             "Follow":{
//                 "createdAt":"2021-04-24T05:54:08.000Z",
//                 "updatedAt":"2021-04-24T05:54:08.000Z",
//                 "UserId":10}
//             }
//         ]
//     }