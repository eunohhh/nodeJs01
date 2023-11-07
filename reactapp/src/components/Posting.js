export default function Posting() {
    return(
        <div className="App" >
            <form action="http://localhost:8080/posts/add" method="POST">
                <h4>글쓰기</h4>
                <input name="title"></input>
                <input name="content"></input>
                <button type="submit">전송</button>
            </form> 
        </div>
    )
}