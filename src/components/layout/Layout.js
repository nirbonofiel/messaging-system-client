import React from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import { MdEmail } from 'react-icons/md';
import { NavLink } from 'react-router-dom';
import './Layout.scss';
import { useSelector } from 'react-redux';

const Layout = (props) => {
  const authSelector = useSelector((state) => state.auth);
  let disabledClass = 'nav-link';
  if (!authSelector.isAuthticated) {
    disabledClass += ' disabled';
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
          </Nav>
        </Navbar.Collapse>
      </Navbar>
      <main>{props.children}</main>
    </div>
  );
};

export default Layout;
