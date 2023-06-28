import { Col, Row } from "react-bootstrap"
import { Tick, Label, BarChart, Tooltip, Bar, XAxis, Pie, PieChart, Cell, Legend, YAxis, ResponsiveContainer, LineChart, Line, CartesianGrid } from "recharts"
import { colourList } from "../../../public/helpers/frontend"
import { msToStr } from "../../../public/helpers/frontendConverters"

const NetherHistogram = ({ data }) => {
  const netherDistData = data.nd

  return (
    <>
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
    </>
  )
}

export default NetherHistogram