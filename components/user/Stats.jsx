import { Col, Row } from "react-bootstrap"
import { CollapsibleContainer } from "./custom/CollapsibleContainer"
import { timelines } from "../../public/helpers/frontend"
import SplitInfo from "./figures/SplitInfo"
import TimelineTable from "./figures/TimelineTable"
import GeneralExtraStats from "./figures/GeneralExtraStats"
import EnterTypeGraph from "./figures/EnterTypeGraph"
import BiomeTypeGraph from "./figures/BiomeTypeGraph"
import IronSourceGraph from "./figures/IronSourceGraph"
import NetherHistogram from "./figures/NetherHistogram"
import PlaytimePieChart from "./figures/PlaytimePieChart"
import TwoWayEnterTable from "./figures/TwoWayEnterTable"

const Stats = ({ data, isSess }) => {
  return (
    <>
      <TimelineTable data={data} />
      <GeneralExtraStats data={data} isSess={isSess} />
      <EnterTypeGraph data={data} />
      <BiomeTypeGraph data={data} />
      <IronSourceGraph data={data} />
      <Row style={{ width: "100%" }}>
        <NetherHistogram data={data} />
        <PlaytimePieChart data={data} />
      </Row>
      <TwoWayEnterTable data={data} />
      <CollapsibleContainer header={<h1>Overworld</h1>}>
        {data.tl.slice(0, 4).map((val, idx) =>
          <Row style={{ width: "100%" }}>
            <SplitInfo splitData={val} splitName={timelines[idx]} />
          </Row>
        )}
      </CollapsibleContainer>
      <CollapsibleContainer header={<h1>Nether</h1>}>
        {data.tl.slice(4, 7).map((val, idx) =>
          <Row style={{ width: "100%" }}>
            <SplitInfo splitData={val} splitName={timelines[idx + 4]} />
          </Row>
        )}
      </CollapsibleContainer>
      <CollapsibleContainer header={<h1>Endgame</h1>}>
        {data.tl.slice(7, 9).map((val, idx) =>
          <Row style={{ width: "100%" }}>
            <SplitInfo splitData={val} splitName={timelines[idx + 7]} />
          </Row>
        )}
      </CollapsibleContainer>
    </>
  )
}

export default Stats