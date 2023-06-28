import { Col, Row } from "react-bootstrap"
import { Tick, Label, BarChart, Tooltip, Bar, XAxis, Pie, PieChart, Cell, Legend, YAxis, ResponsiveContainer, LineChart, Line, CartesianGrid } from "recharts"
import { colourList } from "../../../public/helpers/frontend"
import { msToStr, processLinePlotData } from "../../../public/helpers/frontendConverters"

const IronSourceGraphs = ({ data }) => {
  const ironBarChartData = []
  for (const ironType in data.it) {
    const v = data.it[ironType].sum / data.it[ironType].total
    ironBarChartData.push({
      name: ironType,
      avg: v,
      label: msToStr(v)
    })
  }

  const ironPieChartData = []
  for (const ironType in data.it) {
    ironPieChartData.push({
      name: ironType,
      percOfTotal: data.it[ironType].total
    })
  }

  return (
    <>
      <Row style={{ width: "100%" }}>
        <Col style={{ height: "300px" }} className="d-flex flex-column col-md-6 col-sm-12">
          <h1>Iron Source Average</h1>
          <ResponsiveContainer>
            <BarChart data={ironBarChartData}>
              <XAxis dataKey="name" stroke="#b2b2b2" />
              <YAxis tickFormatter={tick => msToStr(tick)} stroke="#b2b2b2" />
              <Tooltip separator="" formatter={value => [msToStr(value), ""]} cursor={false} itemStyle={{ color: "#000000" }} labelStyle={{ color: "#000000" }} />
              <Bar dataKey="avg" fill="#ffffff">
                {ironBarChartData.map((_, idx) => (
                  <Cell key={`cell-${idx}`} fill={colourList[idx]} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </Col>
        <Col style={{ height: "300px" }} className="d-flex flex-column col-md-6 col-sm-12">
          <h1>Iron Source Percentage</h1>
          <ResponsiveContainer>
            <PieChart width={300} height={250} className="mx-auto">
              <Pie
                dataKey="percOfTotal"
                isAnimationActive={true}
                data={ironPieChartData}
                cx="50%"
                cy="50%"
                outerRadius={90}
                fill="#00d0ff"
              >
                {ironPieChartData.map((_, idx) => (
                  <Cell key={`cell-${idx}`} fill={colourList[(idx + 2) % 4]} />
                ))}
              </Pie>
              <Legend layout="horizontal" verticalAlign="bottom" align="right" />
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </Col>
      </Row>
    </>
  )
}

export default IronSourceGraphs