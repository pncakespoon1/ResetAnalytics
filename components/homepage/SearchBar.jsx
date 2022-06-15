import { Fragment } from "react"
import { Form } from "react-bootstrap"

const Search = (props) => {
  return (
    <Fragment>
      <Form.Control
        style={{fontSize: "2rem"}}
        type="text"
        id="searchBar"
        aria-describedby="searchBarText"
        onChange={e => props.onChange(e.target.value)}
        value={props.value}
        placeholder="Or enter a sheet id..."
      />
    </Fragment>
  )
}

export default Search