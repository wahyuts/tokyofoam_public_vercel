//FILE _DOCUMENT INI JANGAN DI OTAK ATIK (VITAL KARENA BUAT MATERIAL BEKERJA)
import { ServerStyleSheets } from '@mui/styles';
import Document, { Head, Html, Main, NextScript } from 'next/document';
import React from 'react';

export default class MyDocument extends Document {
    render() {
        return (
            <Html lang="en">
                <Head>
                    <link
                        rel="stylesheet"
                        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css"
                        integrity="sha512-1ycn6IcaQQ40/MKBW2W4Rhis/DbILU74C1vSrLJxCq57o941Ym01SwNsOMqvEBFlcgUa6xLiPY/NS5R+E6ztJQ=="
                        crossOrigin="anonymous"
                        referrerPolicy="no-referrer"
                    />
                    <link rel="stylesheet" href="https://unpkg.com/boxicons@latest/css/boxicons.min.css" />
                    <link rel="icon" href="/apple-touch-icon-180x180.png" />
                </Head>
                <body>
                    <Main />
                    <NextScript />
                </body>
            </Html>
        );
    }
}

MyDocument.getInitialProps = async (ctx) => {
    const sheets = new ServerStyleSheets();
    const originalRenderPage = ctx.renderPage;
    ctx.renderPage = () => {
        return originalRenderPage({
            enhanceApp: (App) => (props) => sheets.collect(<App {...props} />)
        });
    };
    const initialProps = await Document.getInitialProps(ctx);
    return {
        ...initialProps,
        styles: [...React.Children.toArray(initialProps.styles), sheets.getStyleElement()]
    };
};
