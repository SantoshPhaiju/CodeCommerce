import Document, { Html, Head, Main, NextScript } from "next/document";

class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps };
  }

  render() {
    return (
      <Html className="overflow-x-hidden">
        <Head>
          <link
            href="https://fonts.googleapis.com/css2?family=Dancing+Script:wght@700&family=Fira+Sans&family=Roboto+Slab&family=Roboto:wght@700&family=Rubik:wght@500&family=Ubuntu&display=swap"
            rel="stylesheet"
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
