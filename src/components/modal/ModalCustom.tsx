import { Button, Modal } from 'antd';

interface ModalCustomProps {
  open: boolean;
  hnadleSubmit?: () => void;
  handleCancel?: () => void;
  title?: string;
  children?: React.ReactNode;
  closable?: boolean;
  width?: number | string;
  [key: string]: any;
}

export default function ModalCustom({
  open,
  hnadleSubmit = () => {},
  handleCancel = () => {},
  title,
  children,
  closable = true,
  width = 520,
  ...otherProps
}: ModalCustomProps) {
  return (
    
      <Modal
        title="Basic Modal"
        closable={{ 'aria-label': 'Custom Close Button' }}
        open={open}
        onOk={hnadleSubmit}
        onCancel={handleCancel}
        {...otherProps}
      >
        {children}
      </Modal>
  );
}
