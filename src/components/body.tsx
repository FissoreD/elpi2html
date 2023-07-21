import { Col, Container, Dropdown, DropdownButton, Form, InputGroup, Row } from "react-bootstrap"
import { useAppDispatch, useAppSelector } from "../app/hooks"
import Card from "./card"
import { setFilterDB, setFilterFileName } from "../features/databaseSlice"

export function Body() {

  const dispatch = useAppDispatch();

  function setFilterInput(e: any) {
    if (e.key === "Enter" || e.key === "NumpadEnter") {
      dispatch(setFilterDB(e.target!.value))
    }
  }

  let db = useAppSelector(state => state.DB_State.db)
  let filterStr = useAppSelector(state => state.DB_State.filter)
  let pathName = useAppSelector(state => state.DB_State.pathName)
  return (
    <Container>
      <Col>
        <Row className="justify-content-center">
          <InputGroup className="mb-3 w-75">
            <InputGroup.Text className="w-4">Filter Predicate: </InputGroup.Text>
            <Form.Control
              aria-label="Small"
              aria-describedby="inputGroup-sizing-sm"
              autoFocus
              onKeyDown={setFilterInput}
              defaultValue={filterStr}
            />
            <DropdownButton
              variant="outline-secondary"
              className="overflow-auto h-50" title=""
            >
              <Dropdown.Item onClick={() => dispatch(setFilterDB(""))}>All</Dropdown.Item>
              <Dropdown.Divider />
              {useAppSelector(state => state.DB_State.predicates).map((x, pos) =>
                <Dropdown.Item eventKey={x} key={pos} onClick={() => dispatch(setFilterDB(x))}>{x}</Dropdown.Item>)}
            </DropdownButton>
            <InputGroup.Text className="w-4">Filter FilePath: </InputGroup.Text>
            <DropdownButton
              variant="outline-secondary"
              className="overflow-auto h-50"
              title={pathName}
            >
              <Dropdown.Item onClick={() => dispatch(setFilterFileName(""))}>All</Dropdown.Item>
              <Dropdown.Divider />
              {useAppSelector(state => state.DB_State.fileNames).map((x, pos) =>
                <Dropdown.Item eventKey={x} key={pos} onClick={() => dispatch(setFilterFileName(x))}>{x}</Dropdown.Item>)}
            </DropdownButton>
          </InputGroup>
        </Row>
        <Row xs={2}>
          {db.map((x, pos) => {
            return <Card key={pos} {...x} />
          })}
        </Row>
      </Col>
    </Container>
  )
}