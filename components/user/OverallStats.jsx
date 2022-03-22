import { Table } from "react-bootstrap"
import { msToStr } from "../../public/helpers/frontendConverters"

const OverallStats = ({ overall }) => {
  return (
    <Table style={{fontSize: "1.35em"}} size="sm" responsive bordered hover variant="light">
      <thead>
        <tr>
          <th>Wood</th>
          <th>Iron Pickaxe</th>
          <th>Nether</th>
          <th>Bastion</th>
          <th>Fortress</th>
          <th>Nether Exit</th>
          <th>Stronghold</th>
          <th>End</th>
        </tr>
      </thead>
      <tbody style={{fontFamily: "Roboto", fontSize: "1em"}}>
        <tr style={{fontSize: "0.9em"}}>
          {overall.tl.map((val, idx) => <td key={idx}>{val.total}</td>)}
        </tr>
        <tr>
          {overall.tl.map((val, idx) => <td key={idx}>{msToStr(val.time)}</td>)}
        </tr>
        <tr>
          <td>{Math.round(overall.tl[0].total / overall.rc * 10000) / 100}%</td>
          {overall.tl.map((val, idx) => {
            if (idx === 0)
              return
            const perc = Math.round(overall.tl[idx].total / overall.tl[idx-1].total * 10000) / 100
            return <td key={idx}>{!isNaN(perc) ? perc : 0}%</td>
          })}
        </tr>
        <tr>
          {overall.tl.map((val, idx) => <td key={idx}>{Math.round(overall.tl[idx].total / overall.rc * 10000) / 100}%</td>)}
        </tr>
      </tbody>
    </Table>
  )
}

export default OverallStats