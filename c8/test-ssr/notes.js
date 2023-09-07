/**크기가 큰 파일을 읽는 코드*/
import {renderToReadableStream} from "react-dom/server";

app.get('/readFile', (req, res) => {
    fs.readFile('./big_file.zip', (err, data) => { // readFile 요청이 오면 크기가 큰 파일을 읽어서 전달함, 이 때 파일의 전체 내용을 메모리로 가져오므로 메모리에 여유가 없다면 부담이 될 수 있음
        if(err) throw err;
        res.end(data);
    });
});

/**스트림을 이용한 파일을 읽는 코드*/
app.get('/readFile', (req, res) => {
    const fileStream = fs.createReadStream('./big_file.zip'); // 파일을 읽기 위해 읽기 가능한 스트림(readable stream) 객체를 만듦
    fileStream.pipe(res); // 노드의 HTTP response 객체는 쓰기 가능한 스트림(writable stream) 객체임 -> 읽기 가능한 스트림에 쓰기 가능한 스트림을 연결함 => 데이터는 읽기 가능한 스트림에서 쓰기 가능한 스트림 쪽으로 흐름
});

/**여러 개의 스트림 연결하기*/
    readableStream
    .pipe(transformStream1) // 읽기 가능한 스트림과 쓰기 가능한 스트림이 생성한 데이터를 기반으로 추가적인 작업을 할 수 있음 -> 데이터를 변환하거나 데이터가 처리되는 속도를 측정하여 콘솔에 출력하는 것도 됨
    .pipe(transformStream2)
    .pipe(writableStream)