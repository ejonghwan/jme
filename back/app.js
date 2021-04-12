// const http = require('http')
// const server = http.createServer((req, res) => {
//     console.log(req.url, req.method)
//     res.end('hello node')
// })

// server.listen(3060, () => {
//     console.log('server on')
// })

// RESTAPI 자주사용
// app.get  가져오다
// app.post 생성하다
// app.put 전체수정
// app.delete 제거
// app.patch 부분 수정
// app.options 찔러보기
// app.head 헤더만 가져오기 (헤더/본문 중 헤더만)



const express = require('express')
const app = express()
const postRouter = require('./routes/post')
const userRouter = require('./routes/user')
const bcrypt = require('bcrypt')


//시퀄라이즈 마지막으로 앱이랑 연결    !!! npx sequelize db:create 이거해서 디비부터 생성
const db = require('./models')
db.sequelize.sync()
    .then(() => {
        console.log('db connected')
    })
    .catch(console.error)


// .use는 express에 뭔가 장착해서 넣어준다는건데 클라이언트에서 post put patch로 보내준 데이터를 해석해서 body에 넣어줌. use안에는 middleware넣어줌. 순서중요
app.use(express.json()) // front안에 json으로 보냈을 때 req.body안에 json으로 넣어줌
app.use(express.urlencoded({ extended: true })); // form submit했을떄 urlincoded방식으로 넘겨주는데 이걸 해석해서 req.body에 넣어줌



app.get('/', (req, res) => {
    res.json([
        {id:1, content: 'asdasd1'},
        {id:2, content: 'asdasd2'},
        {id:3, content: 'asdasd3'},
        {id:4, content: 'asdasd4'},
    ])
    res.send('hihi')
    
})

app.post('/api/post', (req, res) => {
    const aa = res.json([
        {id:1, content: 'asdasd1'},
        {id:2, content: 'asdasd2'},
        {id:3, content: 'asdasd3'},
        {id:4, content: 'asdasd4'},
    ])
    res.send(aa)
})


app.use('/post', postRouter)
app.use('/user', userRouter)

app.listen(3060, () => {
    console.log('server')
})