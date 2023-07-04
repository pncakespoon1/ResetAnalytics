import { Col, Row } from "react-bootstrap"
import { Label, Tooltip, XAxis, YAxis, ResponsiveContainer, LineChart, Line, CartesianGrid } from "recharts"
import { msToStr, logRound } from "../../../public/helpers/frontendConverters"

const SplitHistogram = ({ distData }) => {
  const yStep = (distData[distData.length - 1].count > 3 ? logRound(distData[distData.length - 1].count / 3) : 1)
  const yTicks = Array.from(Array(4), (_, i) => i * yStep)

  return (
    <>
      <h1>Split Distribution</h1>
      <ResponsiveContainer>
        <LineChart width={500} height={250} data={distData} margin={{ top: 10, right: 10, bottom: 70, left: 5 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="time" tick={{ angle: 80, textAnchor: "start", dx: 0 }} stroke="#b2b2b2" tickFormatter={value => msToStr(value, false)} interval={Math.floor(distData.length / 8) - 1} >
            <Label value="Time" offset={-45} position="insideBottom" style={{ textAnchor: 'middle', fill: '#b2b2b2' }} />
          </XAxis>
          <YAxis stroke="#b2b2b2" ticks={yTicks} domain={[yTicks[0], yTicks[yTicks.length - 1]]} >
            <Label value="Cumulative Count" offset={0} position="insideLeft" angle={-90} style={{ textAnchor: 'middle', fill: '#b2b2b2' }} />
          </YAxis>
          <Tooltip />
          <Line type="monotone" dataKey="count" stroke="#8884d8" strokeWidth={3} dot={{ r: 2 }} />
        </LineChart>
      </ResponsiveContainer>
    </>
  )
}

export default SplitHistogram