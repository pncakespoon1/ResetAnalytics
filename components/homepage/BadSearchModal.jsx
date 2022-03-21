import { Modal } from "react-bootstrap"

const BadSearchModal = ({show, onHide}) => {
  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton />
      <Modal.Body>Can't find the player you're looking for</Modal.Body>
    </Modal>
  )
}

export default BadSearchModal