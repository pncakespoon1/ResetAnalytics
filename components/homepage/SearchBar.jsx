import { Fragment } from "react"
import { Form } from "react-bootstrap"

const Search = (props) => {
  return (
    <Fragment>
      <Form.Control
        style={{fontSize: "3vh"}}
        type="text"
        id="searchBar"
        aria-describedby="searchBarText"
        onChange={e => props.onChange(e.target.value)}
        value={props.value}
        placeholder="Enter a player name..."
      />
    </Fragment>
  )
}

export default Search