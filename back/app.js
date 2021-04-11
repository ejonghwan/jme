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

app.listen(3060, () => {
    console.log('server')
})