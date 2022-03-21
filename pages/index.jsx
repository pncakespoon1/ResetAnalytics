import Router from "next/router"
import { useState } from "react"
import { Col, Container, Row, Button } from "react-bootstrap"
import Search from "../components/homepage/SearchBar"
import Layout from "../components/Layout"

const Home = () => {
  const [search, setSearch] = useState("")

  const doSearch = () => {
    if (search !== "") {
      // Make sure guy exists in db
      Router.push(`/${search}`)
    }
  }

  return (
    <Layout style={{"fontFamily": "VT323"}}>
      <div className="jumbotron d-flex align-items-center" style={{minHeight: "100vh"}}>
        <Container>
          <Row style={{minHeight: "25vh"}}>
            <Col>
              <h1 style={{fontSize: "12vh"}}>
                Reset Analytics
              </h1>
            </Col>
          </Row>
          <Row className="justify-content-center" md={3} style={{minHeight: "20vh"}}>
            <Col md={6}>
              <Search value={search} onChange={setSearch} />
            </Col>
            <Col md={1}>
              <Button variant="success" onClick={doSearch} style={{fontSize: "3vh"}}>
                Search
              </Button>
            </Col>
          </Row>
          <p style={{bottom: "0", position: "absolute", left: "0", right: "0"}}>Made with <span style={{color: "red"}}>❤</span> by Specnr</p>
        </Container>
      </div>
    </Layout>
  )
}

export default Home
