import React, { ReactNode, useEffect } from "react";
import ReactDOM from "react-dom";
import { MdClose } from "react-icons/md";
import { CSSTransition } from "react-transition-group";
import "./modal.css";
type ModalProps = {
  title?: string;
  titleInput?: string;
  children: ReactNode;
  footer?: string;
  onClose: () => void;
  show: boolean;
  className?: string;
  hasCloseButton?: boolean
}

const Modal = ({title, titleInput, children, footer, onClose, show, className, hasCloseButton = false}: ModalProps) => {
  const portalDiv = document.getElementById("root") as HTMLElement;
  const closeOnEscapeKeyDown = (e: any) => {
    if ((e.charCode || e.keyCode) === 27) {
      onClose();
    }
  };

  useEffect(() => {
    document.body.addEventListener("keydown", closeOnEscapeKeyDown);
    return function cleanup() {
      document.body.removeEventListener("keydown", closeOnEscapeKeyDown);
    };
  }, []);

  

  return ReactDOM.createPortal(
    <CSSTransition
      in={show}
      unmountOnExit
      timeout={{ enter: 0, exit: 300 }}
    >
      <div className="modal z-50" onClick={onClose}>        
        <div className={`${className} modal-content relative`} onClick={e => e.stopPropagation()}>
          {hasCloseButton && <button type="button" className="absolute right-4 lg:right-10 top-7" onClick={onClose}>
            <MdClose />
          </button>}
          <div className="modal-content-container">
            {title && <div className="modal-header">
              <h4 className="modal-title">{title}</h4>
            </div>}
            {titleInput && <div className="modal-header">
              <span className="modal-title-input">{titleInput}</span>
            </div>}
            <div className="modal-body">{children}</div>
            {footer && <div className="modal-footer">
              <button onClick={onClose} className="button">
                Close
              </button>
            </div>}
          </div>
        </div>
      </div>
    </CSSTransition>,
    portalDiv,
  );
};

export default Modal;
