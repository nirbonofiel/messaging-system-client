import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  getMessages,
  deleteMessage,
  changeTabType,
  getMessage,
} from '../../actions/manageEmailActions';
import { getItemFromLocalStorage } from '../../actions/authActions';
import { Nav } from 'react-bootstrap';
import TableMessages from '../../components/tableMessages/TableMessages';
import './ManageEmails.scss';
import CustomModal from '../../components/customModal/CustomModal';
import { openModalMsg, closeModalMsg } from '../../actions/application';
import Search from '../../components/search/Search';
import { useHistory } from 'react-router-dom';

const ManageEmails = () => {
  const manageEmailsSelector = useSelector((state) => state.manageEmails);
  const applictionlSelector = useSelector((state) => state.application);
  const [messageId, setMessageId] = useState('');
  const [query, setQuery] = useState();
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    dispatch(getMessages(getItemFromLocalStorage('user_id')));
  }, [dispatch, query]);

  const deleteHandler = () => {
    dispatch(deleteMessage(messageId));
    dispatch(closeModalMsg());
  };

  const openMessagePage = (id) => {
    dispatch(getMessage(id));
    if (applictionlSelector.errorMsg === null) {
      history.push('/message');
    }
  };

  const openModalTODelete = (messageId) => {
    setMessageId(messageId);
    dispatch(openModalMsg());
  };

  const clickHandler = (type) => {
    dispatch(changeTabType(type));
  };

  const getFilteredList = (list) => {
    let newList = list;
    if (query != null && query > 0) {
      if (manageEmailsSelector.type === 'inbox') {
        newList = list.filter((index) => index.sender.id === query);
      } else {
        newList = list.filter((index) => index.receiver.id === query);
      }
    }
    return newList;
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
      <Search changeHandler={setQuery} query={query}></Search>
      {manageEmailsSelector.type === 'inbox' ? (
        <React.Fragment>
          <TableMessages
            messages={getFilteredList(manageEmailsSelector.inbox)}
            deleteMessage={openModalTODelete}
            openMessage={openMessagePage}
            userType={'sender'}
          />
        </React.Fragment>
      ) : (
        <React.Fragment>
          <TableMessages
            messages={getFilteredList(manageEmailsSelector.sent)}
            deleteMessage={openModalTODelete}
            openMessage={openMessagePage}
            userType={'receiver'}
          />
        </React.Fragment>
      )}
    </div>
  );
};

export default ManageEmails;
