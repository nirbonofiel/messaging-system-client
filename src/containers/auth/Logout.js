import React from 'react';
import { FiLogOut } from 'react-icons/fi';
import './Logout.scss';
import { useDispatch } from 'react-redux';
import { logout } from '../../services/authActions';

const Logout = () => {
  const dispatch = useDispatch();

  const logoutHandler = () => {
    dispatch(logout());
  };

  return (
    <div className="nav-link logout" onClick={logoutHandler}>
      <span>Logout </span>
      <FiLogOut />
    </div>
  );
};

export default Logout;
