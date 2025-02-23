import { useContext } from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from 'react-router-dom';
import Dropdown from 'react-bootstrap/Dropdown';
import { UserContext } from '../../../Components/User/context/UserContext';
import { useNavigate } from 'react-router-dom';
import { CartContext } from '../../../Components/User/context/cartContext';
import styles from './Navbar.module.css';
import { IoCartOutline } from "react-icons/io5";
export default function CustomeNavbar() {
  const navigate = useNavigate();

  const { cartCount } = useContext(CartContext) || {};
  const { user, loading, setuser } = useContext(UserContext) || {};
  
  const logout = () => {
    localStorage.removeItem('userToken');
    setuser(null);
    navigate('/auth/login');
  };

  return (
    <Navbar expand="lg" className={styles.NavbarBrand}>
      <Container>
        <Navbar.Brand as={Link} to={'/'} className={styles.NavbarBrand}>Super Shop</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" className='navbar-toggler collapsed'/>
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link className={styles['nav-link']} as={Link} to={'/categories'}>Category</Nav.Link>
            <Nav.Link className={styles['nav-link']} as={Link} to={'/products'}>Product</Nav.Link>
            <Nav.Link className={styles['nav-link']} as={Link} to={'/cart'}><IoCartOutline /> {cartCount}</Nav.Link>
            <Dropdown>
              <Dropdown.Toggle variant="" id="dropdown-basic" className={styles['nav-link']}>
                {loading ? "..." : user?.userName}
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item as={Link} to={'/Profile'}>Profile</Dropdown.Item>
                <Dropdown.Item onClick={logout}>Logout</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
