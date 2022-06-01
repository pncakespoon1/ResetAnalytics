import { Col, Row } from "react-bootstrap"
import { BarChart, Tooltip, Bar, XAxis, Pie, PieChart, Cell } from "recharts"
import { msToStr, roundToPerc } from "../../public/helpers/frontendConverters"

const customLabel = ({ x, y, stroke, value }) => {
  return <text x={x} y={y} fill={stroke} dx={25} dy={50} fontSize={24}>{msToStr(value)}</text>
}

const COLOURS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042']

const EntryTypeGraph = ({ data }) => {
  const barChartData = []
  for (const enterType in data.et) {
    barChartData.push({
      name: enterType,
      avg: data.et[enterType].sum / data.et[enterType].total
    })
  }
  
  const pieChartData = []
  for (const enterType in data.et) {
    pieChartData.push({
      name: enterType,
      percOfTotal: data.et[enterType].total
    })
  }
  return (
    <Row style={{width: "100%"}}>
      <Col>
        <h1>Enter Type Average</h1>
        <BarChart width={500} height={250} data={barChartData}>
          <XAxis dataKey="name" />
          <Bar label={customLabel} dataKey="avg" fill="#ffffff" />
        </BarChart>
      </Col>
      <Col>
        <h1>Enter Type Percentage</h1>
        <PieChart width={300} height={250} className="mx-auto">
          <Pie
            dataKey="percOfTotal"
            isAnimationActive={false}
            data={pieChartData}
            cx="50%"
            cy="50%"
            outerRadius={80}
            fill="#00d0ff"
          >
            {pieChartData.map((entry, idx) => (
              <Cell key={`cell-${idx}`} fill={COLOURS[idx % COLOURS.length]} />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
      </Col>
    </Row>
  )
}

export default EntryTypeGraph