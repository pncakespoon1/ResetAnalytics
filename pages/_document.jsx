import Document, { Html, Head, Main, NextScript } from "next/document";
import { Container } from "react-bootstrap"
import Layout from "../components/Layout"
import Footer from "../components/footer"

export default class MainDocument extends Document {
  render() {
    return (
      <Html>
        <Head>
          <meta charSet="utf-8" />
          <meta name="msapplication-TileColor" content="#da532c" />
          <meta name="theme-color" content="#ffffff" />
          <link
            rel="stylesheet"
            href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css"
            integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3"
            crossOrigin="anonymous"
          />
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
          <link href="https://fonts.googleapis.com/css2?family=VT323&display=swap" rel="stylesheet" />
          <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@300&family=VT323&display=swap" rel="stylesheet" /> 
        </Head>
        <body>
          <Layout style={{"fontFamily": "VT323"}}>
            <div className="jumbotron d-flex align-items-center" style={{minHeight: "100vh"}}>
              <Container>
                <Main />
                <NextScript />
                <Footer />
              </Container>
            </div>
          </Layout>
        </body>
      </Html>
    );
  }
}
