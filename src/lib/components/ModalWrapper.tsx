import type { ReactNode } from "react";

interface ModalWrapperProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: ReactNode;
}

export default function ModalWrapper({ isOpen, onClose, title, children }: ModalWrapperProps) {
  if (!isOpen) return null;

  return (
    <div className="full-modal-wrapper">
      <div className="modal-content">
        {title && <h2 className="title-modal">{title}</h2>}
        <button onClick={onClose} className="close-modal-button">X</button>
        {children}
      </div>
    </div>
  );
}