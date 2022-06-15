import { Col, Row } from "react-bootstrap"
import { BarChart, Tooltip, Bar, XAxis, Pie, PieChart, Cell, Legend, YAxis } from "recharts"
import { msToStr } from "../../public/helpers/frontendConverters"

const COLOURS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042']

const EntryTypeGraph = ({ data }) => {
  const barChartData = []
  for (const enterType in data.et) {
    const v = data.et[enterType].sum / data.et[enterType].total
    barChartData.push({
      name: enterType,
      avg: v,
      label: msToStr(v)
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
          <XAxis dataKey="name" stroke="#b2b2b2" />
          <YAxis tickFormatter={tick => msToStr(tick)} stroke="#b2b2b2" />
          <Tooltip separator="" formatter={value => [msToStr(value),""]} cursor={false} itemStyle={{color: "#000000"}} labelStyle={{color: "#000000"}} />
          <Bar dataKey="avg" fill="#ffffff">
            {barChartData.map((entry, idx) => (
              <Cell key={`cell-${idx}`} fill={COLOURS[idx % COLOURS.length]} />
            ))}
          </Bar>
        </BarChart>
      </Col>
      <Col>
        <h1>Enter Type Percentage</h1>
        <PieChart width={300} height={250} className="mx-auto">
          <Pie
            dataKey="percOfTotal"
            isAnimationActive={true}
            data={pieChartData}
            cx="50%"
            cy="50%"
            outerRadius={90}
            fill="#00d0ff"
          >
            {pieChartData.map((entry, idx) => (
              <Cell key={`cell-${idx}`} fill={COLOURS[idx % COLOURS.length]} />
            ))}
          </Pie>
          <Legend layout="horizontal" verticalAlign="bottom" align="right" />
          <Tooltip />
        </PieChart>
      </Col>
    </Row>
  )
}

export default EntryTypeGraph