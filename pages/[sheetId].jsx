import { useRouter } from 'next/router'
import { Spinner} from 'react-bootstrap'
import useSWR from "swr"
import OverallStats from '../components/user/OverallStats';

const fetcher = url => fetch(url).then((res) => res.json());

const UserView = () => {
  const router = useRouter()
  const { sheetId } = router.query
  const { data, error } = useSWR(sheetId ? `/api/sheet/${sheetId}` : null, fetcher);

  if (error) return "An error has occurred."
  if (!data) return <Spinner animation="border" style={{minHeight: "2em", minWidth: "2em", fontSize: "2em"}} />
  if (!data.success) return <h1>Invalid sheet :(</h1>
  console.log(data)
  return (
    <>
      <h1 className="display-2">Lifetime Stats</h1>
      <OverallStats overall={data.overall} />
    </>
  )
}

export default UserView