import { memo } from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import logo from '../../img/logo.png';
import './style.css'

function Header() {

  console.log('img/logo.png')

  return (
    <Navbar bg='light' data-bs-theme="light">
      <Container>
        <Navbar.Brand>
          <img className='ms-2 logo' alt='logo' src={logo}/>
        </Navbar.Brand>
        <Nav className='me-auto'>
          <Nav.Link>Основное расписание</Nav.Link>
        </Nav>
      </Container>
    </Navbar>
  );
}

export default memo(Header);