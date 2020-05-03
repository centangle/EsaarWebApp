import React from 'react';
import { Link } from 'react-router-dom';
import { SettingsHolder } from './setting.styles'
const settings = () => {
    return (
        <div className='page-right'>
            <SettingsHolder>
                <Link to='/uoms'>Units of Measurements</Link>
                <Link to='/items'>Items</Link>
                <Link to='/events'>Events</Link>
            </SettingsHolder>

        </div>
    )
}
export default settings;