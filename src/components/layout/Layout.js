import React from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import { MdEmail } from 'react-icons/md';
import { NavLink } from 'react-router-dom';
import './Layout.scss';
import { useSelector } from 'react-redux';
import Logout from '../../containers/auth/Logout';

const Layout = (props) => {
  const authSelector = useSelector((state) => state.auth);
  let disabledClass = 'nav-link';
  let logout = <Logout />;

  if (!authSelector.isAuthticated) {
    disabledClass += ' disabled';
    logout = null;
  }
  return (
    <div>
      <Navbar bg="dark" variant="dark">
        <Navbar.Brand>
          <span className="email-title">My Email</span>
          <MdEmail />
        </Navbar.Brand>
        <Navbar.Collapse className="justify-content-end">
          <Nav>
            <NavLink className={disabledClass} to="/compose">
              Compose
            </NavLink>
            <NavLink className={disabledClass} to="/manage">
              Manage Emails
            </NavLink>
            {logout}
          </Nav>
        </Navbar.Collapse>
      </Navbar>
      <main>{props.children}</main>
    </div>
  );
};

export default Layout;
