import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  getMessages,
  deleteMessage,
  changeTabType,
} from '../../services/manageEmailActions';
import { getItemFromLocalStorage } from '../../services/authActions';
import { Nav } from 'react-bootstrap';
import TableMessages from '../../components/tableMessages/TableMessages';
import './ManageEmails.scss';
import CustomModal from '../../components/customModal/CustomModal';
import { openModalMsg, closeModalMsg } from '../../services/application';

const ManageEmails = () => {
  const manageEmailsSelector = useSelector((state) => state.manageEmails);
  const applictionlSelector = useSelector((state) => state.application);
  const [messageId, setMessageId] = useState('');
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getMessages(getItemFromLocalStorage('user_id')));
  }, [dispatch]);

  const deleteHandler = () => {
    dispatch(deleteMessage(messageId));
    dispatch(closeModalMsg());
  };

  const openModalTODelete = (messageId) => {
    setMessageId(messageId);
    dispatch(openModalMsg());
  };

  const clickHandler = (type) => {
    dispatch(changeTabType(type));
  };

  return (
    <div>
      {applictionlSelector.errorMsg !== null ? (
        <CustomModal
          modalType={'error'}
          error={applictionlSelector.errorMsg}
          show={applictionlSelector.modalShow}
        />
      ) : null}
      <Nav defaultActiveKey={manageEmailsSelector.type}>
        <Nav.Item>
          <Nav.Link eventKey="inbox" onClick={() => clickHandler('inbox')}>
            Inbox
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="sent" onClick={() => clickHandler('sent')}>
            Sent
          </Nav.Link>
        </Nav.Item>
      </Nav>

      <CustomModal
        modalType={'promotMessage'}
        actionBtnHandle={deleteHandler}
        show={applictionlSelector.modalShow}
        actionBtnTitle="Delete"
        modalBody="Are you sure you want to delete this message?"
        modalTitle="Delete Message"
      />

      {manageEmailsSelector.type === 'inbox' ? (
        <TableMessages
          messages={manageEmailsSelector.inbox}
          deleteMessage={openModalTODelete}
          userType={'sender id'}
        />
      ) : (
        <TableMessages
          messages={manageEmailsSelector.sent}
          deleteMessage={openModalTODelete}
          userType={'receiver id'}
        />
      )}
    </div>
  );
};

export default ManageEmails;
