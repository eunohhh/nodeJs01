export default function PostMany() {
    const handleSubmit = async (event) => {
        event.preventDefault(); // 폼 제출 기본 동작 방지
        const form = event.target;
        // input들을 배열로 만듭니다.
        const titles = form.querySelectorAll('input[name="title"]');
        const contents = form.querySelectorAll('input[name="content"]');
        
        // 각 타이틀과 컨텐츠 쌍에 대해 객체를 만들고, 그 객체들의 배열을 만듭니다.
        const posts = Array.from(titles).map((title, index) => {
            return {
                title: title.value,
                content: contents[index].value,
            };
        });

        const formDataJsonString = JSON.stringify(posts);

        // const formData = new FormData(form);
        // const plainFormData = Object.fromEntries(formData.entries());
        // const formDataJsonString = JSON.stringify(plainFormData);
    
        try {
            const response = await fetch('http://localhost:8080/posts/put', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                },
                body: formDataJsonString,
            });
            if (!response.ok) {
                throw new Error(`Error: ${response.statusText}`);
            }
            const data = await response.json();
            console.log(data);
            // 성공적으로 데이터를 보내고 나서 할 작업을 여기에 추가합니다.
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <>
            <form onSubmit={handleSubmit}>
                <h4>글여러개쓰기(put)</h4>
                <input name="title"></input>
                <input name="content"></input>
                <input name="title"></input>
                <input name="content"></input>
                <button type="submit">전송</button>
            </form>
        </>
    );
}
