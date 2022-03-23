import { Table } from "react-bootstrap"
import { msToStr, roundToPerc } from "../../public/helpers/frontendConverters"

const GeneralExtraStats = ({ data }) => {
  return (
    <Table className="mb-4" style={{fontSize: "1.35em"}} responsive bordered hover variant="light">
      <thead>
        <tr>
          <th>Nethers Per Hour</th>
          <th>Blinds Per Hour</th>
          <th>Total Resets</th>
          <th>Total Playtime</th>
          <th>Avg Time Per Reset</th>
        </tr>
      </thead>
      <tbody style={{fontFamily: "Roboto", fontSize: "1em"}}>
        <tr>
          <td>{ roundToPerc(data.nph) }</td>
          <td>{ roundToPerc(data.bph) }</td>
          <td>{ data.rc }</td>
          <td>{ msToStr(data.tp) }</td>
          <td>{ msToStr(data.tp / data.rc) }</td>
        </tr>
      </tbody>
    </Table>
  )
}

export default GeneralExtraStats