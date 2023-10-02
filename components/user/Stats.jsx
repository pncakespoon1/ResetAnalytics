import { Col, Row } from "react-bootstrap"
import { timelines } from "../../public/helpers/frontend"
import { Tab, Tabs } from 'react-bootstrap'
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
import NetherTree from "./figures/NetherTree"
import IronSourceMosaic from "./figures/IronSourceMosaic"

const Stats = ({ data, data2 = null }) => {
  return (
    <>
      <Tabs transition={false} style={{ width: "1000px" }}>
        <Tab eventKey="overview" title="Overview">
          <Row style={{ width: "100%", margin: "0px" }}>
            <Col style={{ height: "200px", padding: "0px" }} className="d-flex flex-column col-md-12 col-sm-12">
              <TimelineTable data={data} data2={data2} />
            </Col>
          </Row>
          <Row style={{ width: "100%", margin: "0px" }}>
            <Col style={{ height: "150px", padding: "0px" }} className="d-flex flex-column col-md-12 col-sm-12">
              <GeneralExtraStats data={data} data2={data2} />
            </Col>
          </Row>
          {
            (
              data.pn ? (
                <Row style={{ width: "100%", margin: "0px" }}>
                  <Col style={{ height: "300px", padding: "0px" }} className="d-flex flex-column col-md-6 col-sm-12">
                    <PlaytimePieChart data={data} data2={data2} />
                  </Col>
                </Row>
              ) : null
            )
          }
        </Tab>
        <Tab eventKey="overworld" title="Overworld">
          <div>
            {
              (
                data.tl[3].total !== 0 && (data2 == null || data2.tl[3].total !== 0) ? (
                  data.pn ? (
                    <div>
                      <EnterTypeGraph data={data} data2={data2} />
                      <BiomeTypeGraph data={data} data2={data2} />
                      <IronSourceGraph data={data} data2={data2} />
                      <TwoWayEnterTable data={data} data2={data2} />
                      {
                        data2 != null ? null : (
                          <Row style={{ width: "100%", margin: "0px" }}>
                            <Col style={{ height: "300px", padding: "0px" }} className="d-flex flex-column col-md-12 col-sm-12">
                              <IronSourceMosaic data={data.imd} />
                            </Col>
                          </Row>
                        )
                      }
                    </div>
                  ) : (
                    <div>
                      <EnterTypeGraph data={data} data2={data2} />
                      <BiomeTypeGraph data={data} data2={data2} />
                    </div>
                  )
                ) : null
              )
            }
            {
              data.tl.slice(0, 4).map((val, idx) =>
                val.total > 0 && (data2 == null || data2.tl[idx].total > 0) ? (
                  <Row style={{ width: "100%", margin: "0px" }}>
                    <Col style={{ height: "300px", padding: "0px" }} className="d-flex flex-column col-md-6 col-sm-12">
                      <SplitInfo splitData={val} splitName={timelines[idx]} splitData2={data2 == null ? null : data2.tl[idx]} />
                    </Col>
                    <Col style={{ height: "300px", padding: "0px" }} className="d-flex flex-column col-md-6 col-sm-12">
                      <SplitHistogram data1={val.cDist} data2={data2 == null ? null : data2.tl[idx].cDist}/>
                    </Col>
                  </Row>
                ) : null
              )
            }
          </div>
        </Tab>
        {
          (
            data.tl[3].total !== 0 && (data2 == null || data2.tl[3].total !== 0) ? (
              <Tab eventKey="nether" title="Nether">
                <div>
                  {
                    data.tl.slice(4, 7).map((val, idx) =>
                      val.total > 0 && (data2 == null || data2.tl[idx].total > 0) ? (
                        <Row style={{ width: "100%", margin: "0px" }}>
                          <Col style={{ height: "300px", padding: "0px" }} className="d-flex flex-column col-md-6 col-sm-12">
                            <SplitInfo splitData={val} splitName={timelines[idx + 4]} splitData2={data2 == null ? null : data2.tl[idx + 4]} />
                          </Col>
                          <Col style={{ height: "300px", padding: "0px" }} className="d-flex flex-column col-md-6 col-sm-12">
                            <SplitHistogram data1={val.cDist} data2={data2 == null ? null : data2.tl[idx + 4].cDist} />
                          </Col>
                        </Row>
                      ) : null
                    )
                  }
                  {
                    data2 != null ? null : (
                      <Row style={{ width: "100%", margin: "0px" }}>
                        <Col style={{ height: "350px", padding: "0px" }} className="d-flex flex-column col-md-12 col-sm-12">
                          <NetherTree netherTreeData={data.ntd} />
                        </Col>
                      </Row>
                    )
                  }
                </div>
              </Tab>
            ) : null
          )
        }
        {
          (
            data.tl[7].total !== 0 && (data2 == null || data2.tl[7].total !== 0) ? (
              <Tab eventKey="endgame" title="End-game">
                <div>
                  {
                    data.tl.slice(7, 9).map((val, idx) =>
                      val.total > 0 && (data2 == null || data2.tl[idx].total > 0) ? (
                        <Row style={{ width: "100%", margin: "0px" }}>
                          <Col style={{ height: "300px", padding: "0px" }} className="d-flex flex-column col-md-6 col-sm-12">
                            <SplitInfo splitData={val} splitName={timelines[idx + 7]} splitData2={data2 == null ? null : data2.tl[idx + 7]} />
                          </Col>
                          <Col style={{ height: "300px", padding: "0px" }} className="d-flex flex-column col-md-6 col-sm-12">
                            <SplitHistogram data1={val.cDist} data2={data2 == null ? null : data2.tl[idx + 7].cDist}/>
                          </Col>
                        </Row>
                      ) : null
                    )
                  }
                </div>
              </Tab>
            ) : null
          )
        }
      </Tabs>
    </>
  )
}

export default Stats