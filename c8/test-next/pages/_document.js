import Document from 'next/document';
import { ServerStyleSheet } from 'styled-components';

export default class MyDocument extends Document { // 넥스트의 Document 컴포넌트를 상속받아서 컴포넌트를 만듦
    static async getInitialProps(ctx) { // 넥스트에 내장된 Document 컴포넌트의 getInitialProps 함수에서는 styled-jsx의 스타일 코드를 추출함
        const sheet = new ServerStyleSheet();
        const originalRenderPage = ctx.renderPage;

        try {
            ctx.renderPage = () =>
                originalRenderPage({
                    enhanceApp: App => props => sheet.collectStyles(<App {...props} />), // MyDocument 컴포넌트의 getInitialProps 메서드에서는 styled-components의 스타일 코드를 추출함
                });
            const initialProps = await Document.getInitialProps(ctx);
            // styled-components로 추출한 스타일 코드를 반환값에 추가함
            return {
                ...initialProps,
                styles: (
                    <>
                        {initialProps.styles}
                        {sheet.getStyleElement()}
                    </>
                ),
            };
        } finally {
            sheet.seal();
        }
    }
}