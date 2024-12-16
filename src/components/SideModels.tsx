import React from "react";

interface SideModalProps {
    open: boolean;
    onClose: () => void;
    children: React.ReactNode;
    title?: string
}

const SideModal = ({ open, onClose, children, title}: SideModalProps) => {
    return (
        <div className={`side-modal ${open ? "open" : ""}`}>
            {/* <div className="overlay" onClick={onClose}></div> */}
            <div className="flex flex-row justify-between h-20 bg-gray-100 items-center px-4">
                <h5>{title}</h5>
                <button className="close-button" onClick={onClose}>
                    ✕
                </button>
            </div>
            <div className="modal-content">
                {children}
            </div>
        </div>
    );
};

export default SideModal;
