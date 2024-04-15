import { memo } from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import './style.css'
import { Link } from 'react-router-dom';

function Header({ logo, headers }) {

  return (
    <div className='header'>
      <Navbar bg='light' data-bs-theme="light">
        <Container>
          <Navbar.Brand>
            <img className='ms-2 logo' alt='logo' src={logo} />
          </Navbar.Brand>
          <Nav className='me-auto'>
            <Nav.Link href=''>Основное расписание</Nav.Link>
            {/* <Nav.Link href='teacher-lesson-plan'>Расписание преподавателей</Nav.Link> */}
          </Nav>
        </Container>
      </Navbar>
    </div>
  );
}

export default memo(Header);