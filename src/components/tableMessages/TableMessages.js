import React from 'react';
import './TableMessages.scss';

import { MdDelete } from 'react-icons/md';

const TableMessages = (props) => {
  return (
    <div className="table-container">
      {props.messages.length > 0 ? (
        <table className="table table-hover">
          <thead>
            <tr>
              <th>creation date</th>
              <th>{props.userType}</th>
              <th>subject</th>
              <th>#</th>
            </tr>
          </thead>
          <tbody>
            {props.messages.map((message) => (
              <tr key={message.id}>
                <td>
                  {new Intl.DateTimeFormat('he-IL').format(
                    message.creationDate
                  )}
                </td>
                {props.userType === 'receiver' ? (
                  message.receiver.id === message.sender.id ? (
                    <td>Id: {message.receiver.id} | Me</td>
                  ) : (
                    <td>
                      Id: {message.receiver.id} | {message.receiver.username}
                    </td>
                  )
                ) : (
                  <td>
                    Id: {message.sender.id} | {message.sender.username}
                  </td>
                )}
                <td className="msg-body">
                  <span className="msg-subject">{message.subject}</span> -{' '}
                  <span>{message.body}</span>
                </td>
                <td>
                  <div onClick={() => props.deleteMessage(message.id)}>
                    <MdDelete fontSize={18} className="delete-icon"></MdDelete>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <div className="no-msg-display">No messages to display!</div>
      )}
    </div>
  );
};

export default TableMessages;
