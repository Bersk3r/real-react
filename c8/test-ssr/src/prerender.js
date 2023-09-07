/**데이터 의존성이 낮은 일부 페이지만 미리 렌더링하기 위한 리팩터링*/
import fs from 'fs';
import path from 'path';
import { renderPage, prerenderPages } from './common'; // 페이지를 렌더링하는 함수와 미리 렌더링할 페이지의 목록을 가져옴

for (const page of prerenderPages) {
    const result = renderPage(page);
    fs.writeFileSync(path.resolve(__dirname, `../dist/${page}.html`), result); // 페이지를 미리 렌더링하여 dist 폴더 밑에 저장함
}