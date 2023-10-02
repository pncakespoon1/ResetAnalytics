import { useEffect, useState } from 'react';
import { Row, Col, Button } from 'react-bootstrap'
import Select, { components } from "react-select";
import Stats from '../../components/user/Stats';
const axios = require('axios');

const Option = (props) => {
  return (
    <div>
      <components.Option {...props}>
        <input
          type="checkbox"
          checked={props.isSelected}
          onChange={e => null}
        />{" "}
        <label>{props.label}</label>
      </components.Option>
    </div>
  )
}

const MultiValue = props => {
  return (
    <components.MultiValue {...props}>
      <span>{props.data.label}</span>
    </components.MultiValue>
  );
};

const SessionStats = ({ data, sheet, data2 = null, sheet2 = null }) => {
  const formatData = (_, idx) => ({ label: (idx == 0 ? "Latest" : `Session #${data.session.length - idx}`), value: idx })
  const [multi, setMulti] = useState(data ? data.session.filter((_, idx) => idx < 1).map(formatData) : [])
  const [sessData, setSessData] = useState(null)

  if (data2 != null) {
    const formatData2 = (_, idx) => ({ label: (idx == 0 ? "Latest" : `Session #${data2.session.length - idx}`), value: idx })
    const [multi2, setMulti2] = useState(data2 ? data2.session.filter((_, idx) => idx < 1).map(formatData2) : [])
    const [sessData2, setSessData2] = useState(null)
  } else {
    const sessData2 = null
  }

  useEffect(() => {
    axios.post(`/api/sheet/${sheet}`, { keepSessions: multi.map(m => m.value) })
      .then(res => setSessData(res.data.overall))
    if (data2 != null) {
      axios.post(`/api/sheet/${sheet2}`, { keepSessions: multi2.map(m => m.value) })
        .then(res => setSessData2(res.data.overall))
    }
  }, [])


  return (
    <>
      <Row>
        <Col md={6}>
          <h1 className="display-2">Session Stats</h1>
        </Col>
        <Col md={4} className="align-self-center">
          <Select
            placeholder="Select sessions..."
            options={data.session.map(formatData)}
            value={multi}
            onChange={setMulti}
            defaultValue={data.session.filter(sess => sess.selected).map(formatData)}
            isMulti
            closeMenuOnSelect={false}
            controlShouldRenderValue={false}
            components={{ Option, MultiValue }}
            hideSelectedOptions={false}
            backspaceRemovesValue={false}
            styles={{
              option: styles => ({ ...styles, color: "black", textAlign: "left" })
            }}
          />
        </Col>
        <Col md={1} className="align-self-center">
          <Button variant="success" onClick={() => {
            axios.post(`/api/sheet/${sheet}`, { keepSessions: multi.map(m => m.value) })
              .then(res => setSessData(res.data.overall))
          }}>
            Update
          </Button>
        </Col>
      </Row>
      {
        data2 == null ? null : (
          <Row>
            <Col md={4} className="align-self-center">
              <Select
                placeholder="Select sessions..."
                options={data2.session.map(formatData2)}
                value={multi2}
                onChange={setMulti2}
                defaultValue={data2.session.filter(sess => sess.selected).map(formatData2)}
                isMulti
                closeMenuOnSelect={false}
                controlShouldRenderValue={false}
                components={{ Option, MultiValue }}
                hideSelectedOptions={false}
                backspaceRemovesValue={false}
                styles={{
                  option: styles => ({ ...styles, color: "black", textAlign: "left" })
                }}
              />
            </Col>
            <Col md={1} className="align-self-center">
              <Button variant="success" onClick={() => {
                axios.post(`/api/sheet/${sheet2}`, { keepSessions: multi2.map(m => m.value) })
                  .then(res => setSessData(res.data.overall))
              }}>
                Update
              </Button>
            </Col>
          </Row>
        )
      }
      {sessData && <Stats data={sessData} data2={sessData2} />}
    </>
  )
}

export default SessionStats