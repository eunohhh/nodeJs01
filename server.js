const express = require('express');
const path = require('path');
const app = express();

// post 요청 처리시 데이터 꺼내기 쉽도록 request.body 쓸 수 있게 해주는 코드
app.use(express.json())
app.use(express.urlencoded({extended:true}));
// cors 요청 처리
const cors = require('cors');
app.use(cors());
// 리액트 static path (build 한 것들 엔드포인트) 설정
app.use(express.static(path.join(__dirname, 'reactapp/build')));

const { MongoClient, ObjectId } = require("mongodb");

const uri = "mongodb+srv://chorockmasil:Oo!!763754@cluster0.cmyoicy.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri);

app.listen(8080, () => {
    console.log('http://localhost:8080 에서 서버 실행중');
}) 

async function initMongo() {
    try {
        await client.connect();
        const database = client.db('forum');
        const posts = database.collection('post');
        const allArray = await posts.find().toArray();
        // // Query for a movie that has the title 'Back to the Future'
        // const query = { title: 'back to the future' };
        // const movie = await posts.findOne(query);

        console.log(allArray)

        // get 처리
        // send
        // sendFile
        app.get('/', async (request, response) => {
            //__dirname 절대경로임
            response.sendFile(__dirname + '/index.html');
        }) 

        app.get('/movies', async (request, response) => {
            //__dirname 절대경로임
            response.send(allArray);
        })

        // post 처리
        app.post('/posts/add', async (request, response)=>{
            await database.collection('post').insertOne({ title : request.body.title, content : request.body.content })
            response.redirect('/')
        })

    } catch(error){
        console.log(error)
    } finally {
      // Ensures that the client will close when you finish/error
        await client.close();
    }
}
initMongo();



// 항상 리액트 라우터 사용으로 고정
// app.get('*', function (request, response) {
//     response.sendFile(path.join(__dirname, '/reactapp/build/index.html'));
// });