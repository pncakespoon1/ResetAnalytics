import { useRouter } from 'next/router'
import { Spinner, Tabs, Tab } from 'react-bootstrap'
import useSWR from "swr"
import SessionStats from '../../components/user/SessionsStats';
import Stats from '../../components/user/Stats';
import { fetcher } from '../../public/helpers/frontend';

const UsersView = () => {
  const router = useRouter()
  const { sheetIds } = router.query
  if (sheetIds.length != 2) return "An error has occured."
  const { data1, error1 } = useSWR(sheetIds[0] ? `/api/sheet/${sheetIds[0]}` : null, fetcher);
  const { data2, error2 } = useSWR(sheetIds[1] ? `/api/sheet/${sheetIds[1]}` : null, fetcher);

  if (error1 || error2) return "An error has occurred."
  if (!data1 || !data2) return (
    <div style={{ minHeight: "90vh", display: "flex" }}>
      <Spinner animation="border" style={{ minHeight: "2em", minWidth: "2em", fontSize: "2em", alignSelf: "center" }} />
    </div>
  )
  if (!data1.success || !data2.succecss) return <h1>Invalid sheet :(</h1>
  return (
    <div style={{ paddingTop: "25px" }}>
      <Tabs transition={false} variant="pills">
        <Tab eventKey="lifetime" title="Lifetime">
          <h1 className="display-2">Lifetime Stats</h1>
          <Stats data={data1.overall} data2={data2.overall} />
        </Tab>
        <Tab eventKey="latest" title="Latest">
            <h1 className="display-2">Latest Session</h1>
            <Stats data={data1.session[0].ops} data2={data2.session[0].ops} />
        </Tab>
        <Tab eventKey="sessions" title="Sessions">
          <SessionStats data={data1} data2={data2} sheet={sheetIds[0]} sheet2={sheetIds[1]} />
        </Tab>
      </Tabs>
    </div>
  )
}

export default UsersView