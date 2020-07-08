import React from 'react';
import { useSelector } from 'react-redux';
import './Message.scss';

const Message = () => {
  const manageEmailsSelector = useSelector((state) => state.manageEmails);
  let message = manageEmailsSelector.currMessage ? (
    <React.Fragment>
      <div className="row">
        <h2 className="title">{manageEmailsSelector.currMessage.subject}</h2>
        <span className="message-type">{manageEmailsSelector.type}</span>
      </div>
      <div>
        <span className="sender-full-name">
          {manageEmailsSelector.currMessage.sender.full_name}
        </span>
        <span className="sender-username">
          [{manageEmailsSelector.currMessage.sender.username}]
        </span>
      </div>
      <div>
        <span>to </span>
        <span>{manageEmailsSelector.currMessage.receiver.full_name}</span>
        <span className="message-creation-date">
          {new Intl.DateTimeFormat('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric',
            hour: 'numeric',
            minute: 'numeric',
            hour12: true,
          }).format(manageEmailsSelector.currMessage.creation_date)}
        </span>
      </div>
      <hr />
      <div className="message-body">
        {manageEmailsSelector.currMessage.body}
      </div>
    </React.Fragment>
  ) : null;
  return <div className="container message-container">{message}</div>;
};

export default Message;
