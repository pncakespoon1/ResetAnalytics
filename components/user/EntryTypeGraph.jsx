import { Table } from "react-bootstrap"
import { Col, Row } from "react-bootstrap"
import { Tick, Label, BarChart, Tooltip, Bar, XAxis, Pie, PieChart, Cell, Legend, YAxis, ResponsiveContainer, LineChart, Line, CartesianGrid } from "recharts"
import { colourList } from "../../public/helpers/frontend"
import { msToStr, processLinePlotData } from "../../public/helpers/frontendConverters"

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

  const biomeBarChartData = []
  for (const biomeType in data.bt) {
    const v = data.bt[biomeType].sum / data.bt[biomeType].total
    biomeBarChartData.push({
      name: biomeType,
      avg: v,
      label: msToStr(v)
    })
  }

  const biomePieChartData = []
  for (const biomeType in data.bt) {
    biomePieChartData.push({
      name: biomeType,
      percOfTotal: data.bt[biomeType].total
    })
  }

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

  const playtimePieChartData = []
  playtimePieChartData.push({
    name: "OW",
    percOfTotal: data.ot
  })
  playtimePieChartData.push({
    name: "Nether",
    percOfTotal: data.nt
  })
  playtimePieChartData.push({
    name: "Wall",
    percOfTotal: data.wt
  })

  const netherDistData = processLinePlotData(data.nd, 2000)



  return (
    <>
      <Row style={{ width: "100%" }}>
        <Col style={{ height: "300px" }} className="d-flex flex-column col-md-6 col-sm-12">
          <h1>Enter Type Average</h1>
          <ResponsiveContainer >
            <BarChart data={barChartData}>
              <XAxis dataKey="name" stroke="#b2b2b2" />
              <YAxis tickFormatter={tick => msToStr(tick)} stroke="#b2b2b2" />
              <Tooltip separator="" formatter={value => [msToStr(value), ""]} cursor={false} itemStyle={{ color: "#000000" }} labelStyle={{ color: "#000000" }} />
              <Bar dataKey="avg" fill="#ffffff">
                {barChartData.map((_, idx) => (
                  <Cell key={`cell-${idx}`} fill={colourList[idx]} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </Col>
        <Col style={{ height: "300px" }} className="d-flex flex-column col-md-6 col-sm-12">
          <h1>Enter Type Percentage</h1>
          <ResponsiveContainer>
            <PieChart className="mx-auto">
              <Pie
                dataKey="percOfTotal"
                isAnimationActive={true}
                data={pieChartData}
                cx="50%"
                cy="50%"
                outerRadius={90}
                fill="#00d0ff"
              >
                {pieChartData.map((_, idx) => (
                  <Cell key={`cell-${idx}`} fill={colourList[idx]} />
                ))}
              </Pie>
              <Legend layout="horizontal" verticalAlign="bottom" align="right" />
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </Col>
      </Row>

      <Row style={{ width: "100%" }}>
        <Col style={{ height: "300px" }} className="d-flex flex-column col-md-6 col-sm-12">
          <h1>Biome Enter Average</h1>
          <ResponsiveContainer>
            <BarChart width={500} height={250} data={biomeBarChartData}>
              <XAxis dataKey="name" stroke="#b2b2b2" />
              <YAxis tickFormatter={tick => msToStr(tick)} stroke="#b2b2b2" />
              <Tooltip separator="" formatter={value => [msToStr(value), ""]} cursor={false} itemStyle={{ color: "#000000" }} labelStyle={{ color: "#000000" }} />
              <Bar dataKey="avg" fill="#ffffff">
                {biomeBarChartData.map((_, idx) => (
                  <Cell key={`cell-${idx}`} fill={colourList[(idx + 2) % 4]} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </Col>
        <Col style={{ height: "300px" }} className="d-flex flex-column col-md-6 col-sm-12">
          <h1>Biome Enter Percentage</h1>
          <ResponsiveContainer>
            <PieChart width={300} height={250} className="mx-auto">
              <Pie
                dataKey="percOfTotal"
                isAnimationActive={true}
                data={biomePieChartData}
                cx="50%"
                cy="50%"
                outerRadius={90}
                fill="#00d0ff"
              >
                {biomePieChartData.map((_, idx) => (
                  <Cell key={`cell-${idx}`} fill={colourList[(idx + 2) % 4]} />
                ))}
              </Pie>
              <Legend layout="horizontal" verticalAlign="bottom" align="right" />
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </Col>
      </Row>
      <Row style={{ width: "100%" }}>
        <Col style={{ height: "300px" }} className="d-flex flex-column col-md-6 col-sm-12">
          <h1>Iron Source Enter Average</h1>
          <ResponsiveContainer>
            <BarChart width={500} height={250} data={ironBarChartData}>
              <XAxis dataKey="name" stroke="#b2b2b2" />
              <YAxis tickFormatter={tick => msToStr(tick)} stroke="#b2b2b2" />
              <Tooltip separator="" formatter={value => [msToStr(value), ""]} cursor={false} itemStyle={{ color: "#000000" }} labelStyle={{ color: "#000000" }} />
              <Bar dataKey="avg" fill="#ffffff">
                {ironBarChartData.map((_, idx) => (
                  <Cell key={`cell-${idx}`} fill={colourList[(idx + 2) % 4]} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </Col>
        <Col style={{ height: "300px" }} className="d-flex flex-column col-md-6 col-sm-12">
          <h1>Iron Source Enter Percentage</h1>
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
      <Row style={{ width: "100%" }}>
        <Col style={{ height: "300px" }} className="d-flex flex-column col-md-6 col-sm-12">
          <h1>Enter Time Distribution</h1>
          <ResponsiveContainer>
            <LineChart width={500} height={250} data={netherDistData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="time" tickFormatter={value => [msToStr(value), ""]} stroke="#b2b2b2" interval={14} >
                <Label value="X (time)" offset={0} position="insideBottom" style={{ textAnchor: 'middle', fill: '#b2b2b2' }}/>
                <Tick angle={-80} />
              </XAxis>
              <YAxis stroke="#b2b2b2" >
                <Label value="Sub-X enter count" offset={0} position="insideLeft" angle={-90} style={{ textAnchor: 'middle', fill: '#b2b2b2' }} />
              </YAxis>
              <Tooltip />
              <Line type="monotone" dataKey="count" stroke="#8884d8" strokeWidth={3} dot={{ r: 2 }}/>
            </LineChart>
          </ResponsiveContainer>
        </Col>
        <Col style={{ height: "300px" }} className="d-flex flex-column col-md-6 col-sm-12">
          <h1>Playtime Breakdown</h1>
          <ResponsiveContainer>
            <PieChart width={300} height={250} className="mx-auto">
              <Pie
                dataKey="percOfTotal"
                isAnimationActive={true}
                data={playtimePieChartData}
                cx="50%"
                cy="50%"
                outerRadius={90}
                fill="#00d0ff"
              >
                {playtimePieChartData.map((_, idx) => (
                  <Cell key={`cell-${idx}`} fill={colourList[(idx + 2) % 4]} />
                ))}
              </Pie>
              <Legend layout="horizontal" verticalAlign="bottom" align="right" />
              <Tooltip separator="" formatter={value => [msToStr(value), ""]} cursor={false} itemStyle={{ color: "#000000" }} labelStyle={{ color: "#000000" }} />
            </PieChart>
          </ResponsiveContainer>
        </Col>
      </Row>
      <Row style={{ width: "100%" }}>
      <Table className="mb-4" style={{fontSize: "1.35em"}} responsive bordered hover variant="light">
        <tbody>
          <tr style={{ borderBottom: '2px solid #000', fontWeight: 'bold' }}>
            <td style={{ borderRight: '2px solid #000' }}></td>
            <td>Magma Ravine</td>
            <td>Lava Pool</td>
            <td>Bucketless</td>
            <td>Obsidian</td>
          </tr>
          {
            Object.keys(data.ei).map((key1, idx1) => (
              <tr>
                <td style={{ borderRight: '2px solid #000', fontWeight: 'bold' }}>{key1}</td>
                {
                  Object.keys(data.ei[key1]).map((key2, idx2) => (
                    <td style={{fontFamily: "Roboto", fontSize: "1em", backgroundColor: `rgb(${127 + Math.round(data.ei[key1][key2].total/data.tl[2].total * 127)}, ${127 - Math.round(data.ei[key1][key2].total/data.tl[2].total * 127)}, ${127 - Math.round(data.ei[key1][key2].total/data.tl[2].total * 127)})`}} key={idx2}>{data.ei[key1][key2].total}</td>
                  ))
                }
              </tr>
            ))
          }   
        </tbody>
      </Table>
      </Row>
    </>
  )
}

export default EntryTypeGraph