import React, { useState, useMemo, useEffect } from 'react';
import './ComposeMessage.scss';
import serialize from 'form-serialize';
import {
  createMessage,
  getUsers,
  getMe,
} from '../../services/messagingSystemActions';
import { useSelector, useDispatch } from 'react-redux';
import { Toast } from 'react-bootstrap';

const ComposeMessage = () => {
  const messagingSystemSelector = useSelector((state) => state.messagingSystem);
  const dispatch = useDispatch();
  const [show, setShow] = useState(false);

  const submitMessage = (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    const data = serialize(form, { hash: true });
    dispatch(createMessage(data));
  };

  useEffect(() => {
    dispatch(getUsers());
    dispatch(getMe());
  }, [dispatch]);

  useMemo(() => {
    if (messagingSystemSelector.sentMessageSeccuess) {
      document.getElementById('email-form').reset();
      setShow(true);
    }
  }, [messagingSystemSelector.sentMessageSeccuess]);

  return (
    <div className="container compose-container">
      <form id="email-form" className="email-form" onSubmit={submitMessage}>
        <h3 className="form-title">New Message</h3>
        <div className="form-grid container">
          <div className="row">
            {messagingSystemSelector.me ? (
              <React.Fragment>
                <span className="col-1 me-title">Me Id:</span>
                <input
                  type="text"
                  value={messagingSystemSelector.me.id}
                  className="input-style col-5"
                  name="sender"
                  required
                  readOnly
                />
              </React.Fragment>
            ) : null}

            <select
              type="text"
              className="input-style col-6"
              name="receiver"
              required
              defaultValue="Choose receiver..."
            >
              <option className="input-style" value="">
                Choose receiver...
              </option>
              {messagingSystemSelector.users.map((user) => (
                <option value={user.id} key={user.id}>
                  Id: {user.id} | Username: {user.username}
                </option>
              ))}
            </select>
          </div>
        </div>
        <hr />
        <div className="form-group">
          <input
            type="text"
            placeholder="Subject"
            className="input-style"
            name="subject"
            required
          />
          <hr />
          <textarea rows={5} className="input-style" name="body" required />
        </div>
        <button
          variant="primary"
          type="submit"
          className="btn btn-primary submit-btn"
        >
          Send
        </button>
      </form>
      {messagingSystemSelector.sentMessageSeccuess ? (
        <Toast
          onClose={() => setShow(false)}
          show={show}
          delay={1500}
          autohide={true}
          animation
        >
          <Toast.Body>message sent successfully!</Toast.Body>
        </Toast>
      ) : null}
    </div>
  );
};

export default ComposeMessage;
