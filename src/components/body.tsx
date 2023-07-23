import { Col, Container, Dropdown, DropdownButton, Form, InputGroup, Row } from "react-bootstrap"
import { useAppDispatch, useAppSelector } from "../app/hooks"
import Card from "./card"
import { setFilterDB, setFilterFileName } from "../features/databaseSlice"
import { useRef } from "react";

export function Body() {

  const dispatch = useAppDispatch();

  let inputRef = useRef<HTMLInputElement>(null);

  function setFilterInput(e: any) {
    if (e.key === "Enter" || e.key === "NumpadEnter") {
      dispatch(setFilterDB(e.target!.value))
    }
  }

  function dispatchFilterDropdown(e: string) {
    inputRef.current!.innerHTML = e;
    dispatch(setFilterDB(e));
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
            <Form.Control ref={inputRef!}
              onKeyDown={setFilterInput} defaultValue={filterStr} />
            <Dropdown>
              <Dropdown.Toggle variant="success" id="dropdown-basic">
              </Dropdown.Toggle>
              <Dropdown.Menu className="overflow-auto" style={{ height: "200pt" }}>
                <Dropdown.Item onClick={() => dispatch(setFilterDB(""))}>All</Dropdown.Item>
                <Dropdown.Divider />
                {useAppSelector(state => state.DB_State.predicates).map((x, pos) =>
                  <Dropdown.Item eventKey={x} key={pos} onClick={() => dispatchFilterDropdown(x)}>{x}</Dropdown.Item>)}
              </Dropdown.Menu>
            </Dropdown>
            <InputGroup.Text className="w-4">Filter FilePath: </InputGroup.Text>
            <Dropdown>
              <Dropdown.Toggle variant="success" id="dropdown-basic">
                {pathName}
              </Dropdown.Toggle>
              <Dropdown.Menu className="overflow-auto" style={{ height : "200pt" }}>
                <Dropdown.Item onClick={() => dispatch(setFilterFileName(""))}>All</Dropdown.Item>
                <Dropdown.Divider />
                {useAppSelector(state => state.DB_State.fileNames).map((x, pos) =>
                  <Dropdown.Item eventKey={x} key={pos} onClick={() => dispatch(setFilterFileName(x))}>{x}</Dropdown.Item>)}
              </Dropdown.Menu>
            </Dropdown>
          </InputGroup>
        </Row>
        <Row xs={2} className="justify-content-center">
          {db.map((x, pos) => <Card key={pos} {...x} />)}
        </Row>
      </Col>
    </Container>
  )
}