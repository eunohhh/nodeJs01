const express = require('express');
const app = express();
const { MongoClient } = require("mongodb");

const uri = "mongodb+srv://chorockmasil:lyC9v2i5MZODfXPS@cluster0.cmyoicy.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri);

async function run() {
    try {
        const database = client.db('forum');
        const posts = database.collection('post');
        // Query for a movie that has the title 'Back to the Future'
        const query = { title: 'back to the future' };
        const movie = await posts.findOne(query);
        console.log(movie);
    } finally {
      // Ensures that the client will close when you finish/error
        await client.close();
    }
}

app.listen(8080, () => {
    console.log('http://localhost:8080 에서 서버 실행중');
})

// send
// sendFile
app.get('/', async (request, response) => {
    //__dirname 절대경로임
    await run();
    response.sendFile(__dirname + '/index.html');
}) 