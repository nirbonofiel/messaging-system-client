import React, { useEffect } from 'react';
import './Login.scss';
import serialize from 'form-serialize';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../../services/authActions';
import { useHistory } from 'react-router-dom';
import { FaUserAlt, FaLock } from 'react-icons/fa';

const Login = () => {
  const dispatch = useDispatch();
  const authSelector = useSelector((state) => state.auth);
  const history = useHistory();

  const submitLogin = (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    const data = serialize(form, { hash: true });
    dispatch(login(data));
  };

  useEffect(() => {
    if (authSelector.isAuthticated) {
      history.push('/compose');
    }
  }, [history, authSelector.isAuthticated]);

  return (
    <div className="container login-container">
      <form id="login-form" className="login-form" onSubmit={submitLogin}>
        <h3 className="form-title">Login</h3>
        <div className="form-grid container">
          <div className="form-control form-group">
            <FaUserAlt
              className="col-2 padding-left-0 padding-right-15"
              fontSize={16}
            ></FaUserAlt>
            <input
              type="text"
              placeholder="Username"
              className="input-style col-10"
              name="username"
              required
            />
          </div>
          <div className="form-control">
            <FaLock
              className="col-2 padding-left-0 padding-right-15"
              fontSize={16}
            ></FaLock>
            <input
              type="password"
              placeholder="Password"
              className="input-style col-10"
              name="password"
              required
            />
          </div>
          <hr />
          <div className="btn-wrapper">
            <button
              variant="primary"
              type="submit"
              className="btn btn-primary submit-btn"
            >
              Login
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Login;
