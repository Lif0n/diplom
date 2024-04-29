import { memo } from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import './style.css'

function Header({ logo, selected }) {

  return (
    <div className='header'>
      <Navbar bg='light' data-bs-theme="light">
        <Container>
          <Navbar.Brand>
            <img className='ms-2 logo' alt='logo' src={logo} />
          </Navbar.Brand>
          <Nav className='me-auto'>
            <Nav.Link className={selected === '' ? 'active' : ''} href='lesson-plan'>Основное расписание</Nav.Link>
            <Nav.Link className={selected === 'teachers' ? 'active' : ''} href='teachers'>Преподаватели</Nav.Link>
            {/* <Nav.Link href='teacher-lesson-plan'>Расписание преподавателей</Nav.Link> */}
          </Nav>
        </Container>
      </Navbar>
    </div>
  );
}

export default memo(Header);