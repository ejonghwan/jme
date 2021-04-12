const express = require('express');
const router = express()
const { User } = require('../models/user') //module에 만든 User db
const bcrypt = require('bcrypt')

router.post('/', async (req, res, next) => { //POST /user/
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

        //200 성공 300리다이렉트 400클라이언트 요청  500서버처리에러
        res.status(201).send('ok');
    } catch(error) {
        console.error(error)
        next(error)
    }
    
})

module.exports = router;