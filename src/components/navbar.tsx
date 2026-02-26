import { useRef } from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { setDB } from '../features/databaseSlice';
import { useAppDispatch } from '../app/hooks';

function NavBar() {
  const inputFile = useRef<HTMLInputElement>(null) 
  const dispatch = useAppDispatch();

  const openFile = () => inputFile.current!.click();

  function readSingleFile(e: any) {
    var file = e.target.files[0];
    if (!file) return
    var reader = new FileReader();
    reader.onload = function (e) {
      var contents : string = e.target?.result as string;
      dispatch(setDB(JSON.parse(contents).clauses))
    };
    reader.readAsText(file);
  }

  return (
    <Navbar collapseOnSelect expand="lg" className="bg-body-tertiary mb-3">
      <Container>
        <Navbar.Brand href="#home">Elpi Database Viewer</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link onClick={openFile}>Open File</Nav.Link>
            <input type='file' id='file' ref={inputFile} style={{ display: 'none' }} onChange={readSingleFile} />
            {/* <NavDropdown title="Dropdown" id="collasible-nav-dropdown">
              <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">
                Another action
              </NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.4">
                Separated link
              </NavDropdown.Item>
            </NavDropdown> */}
          </Nav>
          {/* <Nav>
            <Nav.Link href="#deets">More deets</Nav.Link>
            <Nav.Link eventKey={2} href="#memes">
              Dank memes
            </Nav.Link>
          </Nav> */}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBar;