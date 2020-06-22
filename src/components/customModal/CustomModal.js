import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import { closeModalError, closeModalMsg } from '../../services/application';
import { useDispatch } from 'react-redux';
import './CustomModal.scss';

const CustomModal = (props) => {
  const dispatch = useDispatch();
  const onHideModalErrorHandler = () => {
    dispatch(closeModalError());
  };
  const onHideModalMessageHandler = () => {
    dispatch(closeModalMsg());
  };
  let modal = null;
  switch (props.modalType) {
    case 'error':
      modal = (
        <Modal show={props.show} onHide={onHideModalErrorHandler}>
          <Modal.Header closeButton>
            <Modal.Title className="error">Error</Modal.Title>
          </Modal.Header>
          <Modal.Body>{props.error}</Modal.Body>
        </Modal>
      );
      break;
    case 'promotMessage':
      modal = (
        <Modal show={props.show} onHide={onHideModalMessageHandler}>
          <Modal.Header closeButton>
            <Modal.Title>{props.modalTitle}</Modal.Title>
          </Modal.Header>
          <Modal.Body>{props.modalBody}</Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={onHideModalMessageHandler}>
              Close
            </Button>
            <Button variant="danger" onClick={props.actionBtnHandle}>
              {props.actionBtnTitle}
            </Button>
          </Modal.Footer>
        </Modal>
      );
      break;
    default:
      return;
  }
  return <div>{modal}</div>;
};

export default CustomModal;
