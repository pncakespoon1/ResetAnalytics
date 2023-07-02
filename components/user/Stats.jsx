import { Col, Row } from "react-bootstrap"
import { timelines } from "../../public/helpers/frontend"
import CollapsibleContainer from "./custom/CollapsibleContainer"
import SplitInfo from "./figures/SplitInfo"
import TimelineTable from "./figures/TimelineTable"
import GeneralExtraStats from "./figures/GeneralExtraStats"
import EnterTypeGraph from "./figures/EnterTypeGraph"
import BiomeTypeGraph from "./figures/BiomeTypeGraph"
import IronSourceGraph from "./figures/IronSourceGraph"
import SplitHistogram from "./figures/SplitHistogram"
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
        <PlaytimePieChart data={data} />
      </Row>
      <TwoWayEnterTable data={data} />
      <CollapsibleContainer header={<h1>Overworld</h1>}>
        {data.tl.slice(0, 4).map((val, idx) =>
          <Row style={{ width: "100%" }}>
            <Col style={{ height: "300px" }} className="d-flex flex-column col-md-6 col-sm-12">
              <SplitInfo splitData={val} splitName={timelines[idx]} />
            </Col>
            <Col style={{ height: "300px" }} className="d-flex flex-column col-md-6 col-sm-12">
              <SplitHistogram distData={val.cDist} />
            </Col>
          </Row>
        )}
      </CollapsibleContainer>
      <CollapsibleContainer header={<h1>Nether</h1>}>
        {data.tl.slice(4, 7).map((val, idx) =>
          <Row style={{ width: "100%" }}>
            <Col style={{ height: "300px" }} className="d-flex flex-column col-md-6 col-sm-12">
              <SplitInfo splitData={val} splitName={timelines[idx + 4]} />
            </Col>
            <Col style={{ height: "300px" }} className="d-flex flex-column col-md-6 col-sm-12">
              <SplitHistogram distData={val.cDist} />
            </Col>
          </Row>
        )}
      </CollapsibleContainer>
      <CollapsibleContainer header={<h1>Endgame</h1>}>
        {data.tl.slice(7, 9).map((val, idx) =>
          <Row style={{ width: "100%" }}>
            <Col style={{ height: "300px" }} className="d-flex flex-column col-md-6 col-sm-12">
              <SplitInfo splitData={val} splitName={timelines[idx + 7]} />
            </Col>
            <Col style={{ height: "300px" }} className="d-flex flex-column col-md-6 col-sm-12">
              <SplitHistogram distData={val.cDist} />
            </Col>
          </Row>
        )}
      </CollapsibleContainer>
    </>
  )
}

export default Stats