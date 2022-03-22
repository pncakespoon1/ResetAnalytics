import { useRouter } from 'next/router'
import { Spinner, Row, Col, Container } from 'react-bootstrap'
import useSWR from "swr"

import Footer from "../components/footer"

const fetcher = url => fetch(url).then((res) => res.json());

const UserView = () => {
  const router = useRouter()
  const { sheetId } = router.query
  const { data, error } = useSWR(`/api/sheet/${sheetId}`, fetcher);

  if (error) return "An error has occurred."
  if (!data) return <Spinner animation="border" style={{minHeight: "2em", minWidth: "2em", fontSize: "2em"}} />
  if (!data.success) return <h1>Invalid sheet :(</h1>
  console.log(data)
  return (
    <h1>Good sheet :)</h1>
  )
}

export default UserView