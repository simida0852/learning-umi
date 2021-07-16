import React from 'react';
import { Modal } from 'antd';

interface ModalFormProps {
  modalWidth?: string | number;
  footer?: React.ReactElement;
  modalTitle: string;
  modalVisible: boolean;
  onCancel: () => void;
}

const ModalForm: React.FC<ModalFormProps> = (props) => {
  const { modalVisible, onCancel, modalTitle, modalWidth, footer } = props;

  return (
    <Modal
      destroyOnClose
      title={modalTitle}
      visible={modalVisible}
      onCancel={() => onCancel()}
      footer={footer || null}
      width={modalWidth || 640}
    >
      {props.children}
    </Modal>
  );
};

export default ModalForm;
