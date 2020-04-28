import React from 'react';
import './modal.styles.scss';
const Modal = ({closeModal,children})=>{
    return(
        <div className='modal'>
            <div className='modal-body'>
                <button className='close' onClick={closeModal}>X</button>
                {children}
            </div>
            <div className='overlay' onClick={closeModal}></div>
        </div>
    )
}

export default Modal;