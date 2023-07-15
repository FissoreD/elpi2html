import { Col, Container, Form, InputGroup, Row } from "react-bootstrap"
import { useAppDispatch, useAppSelector } from "../app/hooks"
import Card from "./card"
import React from "react"
import { setFilterDB } from "../features/databaseSlice"

export function Body() {
  const dispatch = useAppDispatch();

  function setFilterInput(e: any) {
    if (e.key === "Enter" || e.key === "NumpadEnter") {
      dispatch(setFilterDB(e.target!.value))
    }
  }

  let db = useAppSelector(state => state.DB_State.db)
  let filterStr = useAppSelector(state => state.DB_State.filter)
  return (
    <Container>
      <Col>
        <Row className="justify-content-center">
          <InputGroup className="mb-3 w-75">
            <InputGroup.Text className="w-4">Filter: </InputGroup.Text>
            <Form.Control
              aria-label="Small"
              aria-describedby="inputGroup-sizing-sm"
              autoFocus
              onKeyDown={setFilterInput}
            />
          </InputGroup>
        </Row>
        <Row xs={2}>
          {db.map((x, pos) =>
            filterStr === "" || x.predicate === filterStr ?
              <Col className="mb-4" key={pos}><Card {...x} /> </Col> :
              <React.Fragment key={pos}></React.Fragment>)}
        </Row>
      </Col>
    </Container>
  )
}