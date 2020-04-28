import React from 'react';
import { SpinnerSmall } from '../spinner/spinner.component';
import './button.styles.scss';
const CustomButton = ({ handleClick,loading, children }) => {
    return (
        <button className='custom-btn' onClick={handleClick}>
            {loading ? <SpinnerSmall /> : null}
            {children}
        </button>
    )
}
export default CustomButton;