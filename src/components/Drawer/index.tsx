import React, { ReactElement } from 'react';
import { Drawer } from 'antd';

interface DrawerComProps {
  drawerHeaderName: string;
  visible: boolean;
  onClose: () => void;
  children?: ReactElement;
}

const DrawerCom = (props: DrawerComProps) => {
  const { drawerHeaderName, onClose, visible, children } = props;
  return (
    <>
      <Drawer
        title={drawerHeaderName}
        width={720}
        onClose={onClose}
        visible={visible}
        bodyStyle={{ paddingBottom: 80 }}
        destroyOnClose
      >
        {children}
      </Drawer>
    </>
  );
};

export default DrawerCom;
