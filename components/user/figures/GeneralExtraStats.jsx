import { Table } from "react-bootstrap"
import { msToStr, roundToPerc } from "../../../public/helpers/frontendConverters"

const GeneralExtraStats = ({ data }) => {
  return (
    <>
      <Table className="mb-4" style={{ fontSize: "1.35em" }} responsive bordered hover variant="light">
        <thead>
          <tr>
            <th>RNPH</th>
            <th>FNPH</th>
            <th>Blinds/Hr</th>
            <th>Resets</th>
            <th>Playtime</th>
            <th>Time Per Played</th>
            <th>Resets Per Enter</th>
            <th>Seeds Played</th>
          </tr>
        </thead>
        <tbody style={{ fontFamily: "Roboto", fontSize: "1em" }}>
          <tr>
            <td>{roundToPerc(data.rnph)}</td>
            <td>{roundToPerc(data.fnph)}</td>
            <td>{roundToPerc(data.bph)}</td>
            <td>{data.rc}</td>
            <td>{msToStr(data.tp)}</td>
            <td>{msToStr(data.tp / data.pc)}</td>
            <td>{roundToPerc(data.rc / data.tl[3].total)}</td>
            <td>{roundToPerc(roundToPerc(data.pc / data.rc, 4) * 100)}%</td>
          </tr>
        </tbody>
      </Table>
    </>
  )
}

export default GeneralExtraStats