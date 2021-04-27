const express = require('express');
const router = express.Router()
const multer = require('multer')
const path = require('path') //node에서 지원

const { Post, User, Image, Comment } = require('../models');
const { isLoggedIn } = require('./middlewares')



// 멀터는 어떤곳은 한장 어떤곳은 여러장 올릴 수 있으니 각 라우터마다 셋팅을 따로 해줌
const upload = multer({
    storage: multer.diskStorage({ //일단은 로컬 하드디스크에 저장해뒀다가 나중에 배포할땐 서버에다 저장해야됨. 이유는 서버 스케일링(여러 대 복사할때) 이미지가 로컬에 있으면 여러대에 같이 복사되기 떄문에  
        destination(req, file, done) { 
            done(null, 'uploads')
        },
        filename(req, file, done) {  // ex)종환.png 
            const ext = path.extname(file.originalname) //확장자 추출   (.png)
            const basename = path.basename(file.originalname, ext) //path는 node 기본제공꺼. 여기에서 이름만 찾아올 수 있다  (종환)
            done(null, basename + '_' + new Date().getTime() + ext) //이미지에 이름이 겹치기 떄문에 시간을 뒤에 붙여줌.
        }
    }),
    limits: { fileSize: 20 * 1024 * 1024 } //용량 제한 20MB 
    // 동영상같은 경우에는 서버를 안거치는게 좋음. 프론트에서 바로 클라우드 db 로 올리는걸 지원하는데 그걸 사용 
})

//input에 name="image" 가져온거임. array는 여러장. single은 한장. text는 .none()  filz? 는 file 인풋이 여러개일때 
router.post('/images', isLoggedIn, upload.array('image'), async (req, res, next) => { 
    //실행순서 
    // 1. images로 post 요청받으면 
    // 2. isLoggedIn 로그인검사 하고 
    // 3. upload image 올려주고  req.files <- 여기 이미지 업로드 정보가 들어있음.
    // 4. 그다음 코드 실행 

    console.log(req.files)
    res.json(req.files.map(val => val.filename))
})

/* 
    이미지 올리는 방식은 여러가진데
    1. 멀티파티 방식은 한방에 서버로 올려주는 방식이라 ex) { content: 'asdasd', image: 10101010101 } 
       미리보기같은거 할떄 좀 애매함
    2. 그래서 우리는 두번 보내는 방식  
        이미지만 요청했다가 ->     파일명 응답받고  <-   파일명으로 미리보기/리사이징 해놓고    사람들이 컨텐츠 작성해서 올리게끔 (단점. 1. 두번 요청 2. 이미지만 업로드했다가 지울수도 있어서 3. 처리가 복잡함)
*/


// post 게시물 db에 추가하고 응답하는  
router.post('/', isLoggedIn, upload.none(), async (req, res, next) => { //POST /post/
    try {
        const post = await Post.create({ //db에 생성
            content: req.body.content,
            UserId: req.user.id, //passport 중에 deserializeUser함수에서 라우터가 실행할때마다 req.user에 아이디를 넣어줌
        })

        if(req.body.image) {
            if(Array.isArray(req.body.image)) { //조건이 두가진데, 이미지 여러개 올리면 image: [1.png, 2.png] <-배열
                const images = await Promise.all(req.body.image.map(image => Image.create({ src: image }))) //promise. db에 파일을 저장하는게 아니라 주소만 저장함. 파일은 uploads폴더에
                await post.addImages(images) //이렇게 하면 post.create 게시물만든거에 이미지패스가 추가됨
            } else { // 한개만 올리면 image: 1.png
                const image = await Image.create({ src: req.body.image })
                await post.addImages(image)
            }
        }

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