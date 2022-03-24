import Router from "next/router"
import { useState } from "react"
import { Col, Row, Button } from "react-bootstrap"

import BadSearchModal from "../components/homepage/BadSearchModal"
import Search from "../components/homepage/SearchBar"

const Home = () => {
  const [search, setSearch] = useState("")
  const [showModal, setShowModal] = useState(false)

  const doSearch = () => {
    if (search !== "")
      Router.push(`/sheet/${search}`)
  }

  return (
    <>
      <BadSearchModal show={showModal} onHide={() => setShowModal(false)} />
      <Row style={{minHeight: "25vh"}}>
        <Col>
          <h1 style={{fontSize: "12vh"}}>
            Reset Analytics
          </h1>
        </Col>
      </Row>
      <Row className="d-flex justify-content-center flex-wrap" md={3} style={{minHeight: "20vh"}}>
        <Col md={10}>
          <Search value={search} onChange={setSearch} />
        </Col>
        <Col md={2}>
          <Button variant="success" onClick={doSearch} style={{fontSize: "3vh"}}>
            Search
          </Button>
        </Col>
      </Row>
    </>
  )
}

export default Home
