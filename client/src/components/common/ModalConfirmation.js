import React from "react";
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from "reactstrap";

const ModalConfirmation = ({
  title,
  modal,
  toggle,
  description,
  messages,
  className,
  onConfirm,
  onClose,
  loading,
}) => {
  const infoMessages = messages.map((message, index) => {
    if (message.value) {
      return (
        <div key={index}>
          <small className="text-warning">{message.value}</small>
        </div>
      );
    } else return null;
  });

  return (
    <Modal isOpen={modal} toggle={toggle}>
      <ModalHeader className={className}>
        <div>
          <h3 className="text-white">{title}</h3>
        </div>
      </ModalHeader>
      <ModalBody>
        {description}
        {messages && <div className="mt-2">{infoMessages}</div>}
      </ModalBody>
      <ModalFooter>
        <Button disabled={loading} color="primary" onClick={onConfirm}>
          Aceptar
        </Button>
        <Button onClick={onClose}>Cancelar</Button>
      </ModalFooter>
    </Modal>
  );
};

ModalConfirmation.defaultProps = {
  messages: [],
  title: "",
};

export default ModalConfirmation;
