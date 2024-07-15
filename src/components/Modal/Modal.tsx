import React, { ReactNode } from "react";
import "./Modal.css"; // Adicione os estilos necessários

interface ModalProps {
	show: boolean;
	onClose: () => void;
	children: ReactNode;
}

const Modal: React.FC<ModalProps> = ({ show, onClose, children }) => {
	if (!show) {
		return null;
	}

	return (
		<div className="modal-overlay">
			<div className="modal">
				<button className="modal-close-button" onClick={onClose}>
					&times;
				</button>
				<div className="modal-content">{children}</div>
			</div>
		</div>
	);
};

export default Modal;
