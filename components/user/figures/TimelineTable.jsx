import { Col, Row } from "react-bootstrap"
import { Table } from "react-bootstrap"
import { msToStr, roundToPerc } from "../../../public/helpers/frontendConverters"
import { MainStatsToolTips } from "../../Tooltips"

const TimelineTable = ({ data }) => {
  return (
    <>
      <MainStatsToolTips />
      <Table className="mb-4" style={{ fontSize: "1.35em" }} responsive bordered hover variant="light">
        <thead>
          <tr>
            <th>Iron</th>
            <th>Wood</th>
            <th>Iron Pickaxe</th>
            <th>Nether</th>
            <th>Structure #1</th>
            <th>Structure #2</th>
            <th>Nether Exit</th>
            <th>Stronghold</th>
            <th>End</th>
          </tr>
        </thead>
        <tbody style={{ fontFamily: "Roboto", fontSize: "1em" }}>
          <tr data-tip data-for="totals-tip" style={{ fontSize: "0.9em" }}>
            {data.tl.map((val, idx) => <td key={idx}>{val.total}</td>)}
          </tr>
          <tr data-tip data-for="avgs-tip">
            {data.tl.map((val, idx) => <td key={idx}>{msToStr(val.time)}</td>)}
          </tr>
        </tbody>
      </Table>
    </>
  )
}

export default TimelineTable