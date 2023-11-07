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
        return [database, client];
    } catch(error){
        console.log(error)
    }
}
initMongo()
    .then(async ([db, client])=>{
        const posts = db.collection('post');
        const allArray = await posts.find().toArray();

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
            await db.collection('post').insertOne({ title : request.body.title, content : request.body.content })
            response.redirect('/')
        })

        // put 처리
        app.put('/posts/put', async (request, response)=>{
            try {
                // 데이터베이스에 데이터를 삽입하는 로직
                await db.collection('post').insertMany(request.body);
        
                // 성공적으로 데이터를 삽입했다고 클라이언트에 알림
                response.status(200).json({ message: "Posts added successfully" });
            } catch (error) {
                // 오류 발생 시, 클라이언트에 오류 메시지와 함께 500 상태 코드를 보냄
                response.status(500).json({ message: "An error occurred", error: error });
            }
        })

        // 항상 리액트 라우터 사용으로 고정
        // app.get('*', function (request, response) {
        //     response.sendFile(path.join(__dirname, '/reactapp/public/index.html'));
        // });
    })
    .catch(err => console.log(err))



