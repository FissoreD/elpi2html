import { Card as C, Col, Modal, Row } from 'react-bootstrap';
import Dispatch from './dispatch';
import { CardType } from './types';
import 'react-resizable/css/styles.css';
import { useAppSelector } from "../app/hooks"
import { filePathFromTitle } from "../tools"
import { useState } from 'react';
import { BsArrowsFullscreen } from "react-icons/bs";


function Card({ title, cnt, predicate }: CardType) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  let filterStr = useAppSelector(state => state.DB_State.filter)
  let pathName = useAppSelector(state => state.DB_State.pathName)
  let display = (filterStr === "" || predicate.includes(filterStr)) &&
    (pathName === "" || filePathFromTitle(title) === pathName);
  let cardCnt = <Dispatch {...cnt} />
  return (
    <Col className='my-2' style={display ? {} : { display: "none" }}>
      {/* <ResizableBox width={496} height={367} style={{
        padding: 0, margin: "1em",
        display: display ? "block" : "none"
      }} > */}
      <C border="primary h-100">
          <C.Header>{title}
            <BsArrowsFullscreen className="position-absolute top-0 end-0 m-1 zoom-button" onClick={handleShow} />
          </C.Header>
          <C.Body className="my-auto">
            <Row className="h-100">
              <div className="my-auto">
                {cardCnt}
              </div>
            </Row>
          </C.Body>
        </C>
      {/* </ResizableBox> */}
      <Modal show={show} onHide={handleClose} size="lg" centered>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>{cardCnt}</Modal.Body>
        {/* <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Save Changes
          </Button>
        </Modal.Footer> */}
      </Modal>
    </Col>
  )
}

export default Card;
