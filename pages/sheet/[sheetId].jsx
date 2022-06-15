import { useRouter } from 'next/router'
import { Spinner, Tabs, Tab } from 'react-bootstrap'
import useSWR from "swr"
import Stats from '../../components/user/Stats';
import { fetcher } from '../../public/helpers/frontend';

const UserView = () => {
  const router = useRouter()
  const { sheetId } = router.query
  const { data, error } = useSWR(sheetId ? `/api/sheet/${sheetId}` : null, fetcher);

  if (error) return "An error has occurred."
  if (!data) return <Spinner animation="border" style={{minHeight: "2em", minWidth: "2em", fontSize: "2em"}} />
  if (!data.success) return <h1>Invalid sheet :(</h1>
  return (
    <Tabs transition={false}>
      <Tab eventKey="lifetime" title="Lifetime">
        <h1 className="display-2">Lifetime Stats</h1>
        <Stats data={data.overall} />
      </Tab>
      {
        data.session.map((session, idx) => {
          return (
            <Tab key={idx} eventKey={session.time} title={`Session #${data.session.length - idx}`}>
              <h1 className="display-2">Overall Stats</h1>
              <Stats data={session.ops} />
            </Tab>
          )
        })
      }
    </Tabs>
  )
}

export default UserView