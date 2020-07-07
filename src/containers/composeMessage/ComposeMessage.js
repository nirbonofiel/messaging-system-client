import React, { useState, useEffect } from 'react';
import './ComposeMessage.scss';
import serialize from 'form-serialize';
import {
  createMessage,
  getUsers,
  messageCreatedSuccessfully,
} from '../../actions/composeMessageActions';
import { getMe } from '../../actions/authActions';

import { useSelector, useDispatch } from 'react-redux';
import { Toast } from 'react-bootstrap';
import CustomModal from '../../components/customModal/CustomModal';
import { MdSend } from 'react-icons/md';

const ComposeMessage = () => {
  const composeMessageSelector = useSelector((state) => state.composeMessage);
  const authSelector = useSelector((state) => state.auth);
  const applictionlSelector = useSelector((state) => state.application);
  const dispatch = useDispatch();
  const [show, setShow] = useState(false);

  const submitMessage = (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    const data = serialize(form, { hash: true });
    dispatch(createMessage(data));
  };

  useEffect(() => {
    if (
      composeMessageSelector.sentMessageSuccess &&
      document.getElementById('email-form') != null
    ) {
      document.getElementById('email-form').reset();
      setShow(true);
      dispatch(messageCreatedSuccessfully());
    }

    dispatch(getUsers());
    dispatch(getMe());
  }, [dispatch, composeMessageSelector.sentMessageSuccess]);

  return (
    <div className="container compose-container">
      {applictionlSelector.errorMsg !== null ? (
        <CustomModal
          modalType={'error'}
          error={applictionlSelector.errorMsg}
          show={applictionlSelector.modalShow}
        />
      ) : null}
      <form id="email-form" className="email-form" onSubmit={submitMessage}>
        <h3 className="form-title">New Message</h3>
        <div className="form-grid container">
          <div className="row">
            {authSelector.me ? (
              <React.Fragment>
                <span className="col-1 me-title">Username:</span>
                <input
                  type="text"
                  value={authSelector.me.username}
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
              {composeMessageSelector.users.map((user) => (
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
          <MdSend color="white" className="send-icon" />
        </button>
      </form>

      <Toast
        onClose={() => setShow(false)}
        show={show}
        delay={1500}
        autohide={true}
        animation
      >
        <Toast.Body>message sent successfully!</Toast.Body>
      </Toast>
    </div>
  );
};

export default ComposeMessage;
