import React from 'react';
import { Link } from 'react-router-dom';
import './sidebar.styles.scss';
import profileIcon from '../../../assets/profile.png';
import homeIcon from '../../../assets/home.png';
import organizationIcon from '../../../assets/organization.png';
import giveIcon from '../../../assets/coin.png';
import takeIcon from '../../../assets/take.png';
import volunteerIcon from '../../../assets/volunteer.png';
import settingsIcon from '../../../assets/settings.png';
import graphIcon from '../../../assets/graph.png';
import plugIcon from '../../../assets/plug.png';
import activeBgIcon from '../../../assets/active-btn-bg.png';
import { useHistory } from "react-router-dom";
const DockSider = () => {
    let history = useHistory();
    return (
        <div className='page-left sidebar'>
            <nav>
                <ul>
                    <li>
                        <Link to='/'>
                            <img className='profile' src={profileIcon} alt='Profile Icon' />
                        </Link>
                    </li>
                    <li className={history.location.pathname === '/' ? 'active' : ''}>
                        <Link to='/'><img src={homeIcon} alt='Home Icon' /></Link>
                    </li>
                    <li className={history.location.pathname === '/organizations' ? 'active' : ''}>
                        <Link to='/organizations'><img src={organizationIcon} alt='Organization Icon' /></Link>
                    </li>
                    <li className={history.location.pathname === '/requests' ? 'active' : ''}>
                        <Link to='/requests'><img src={giveIcon} alt='Give Icon' /></Link>
                    </li>
                    <li className={history.location.pathname === '/donation-requests' ? 'active' : ''}>
                        <Link to='/donation-requests'><img src={takeIcon} alt='Give Icon' /></Link>
                    </li>
                    <li className={history.location.pathname === '/volunteer' ? 'active' : ''}>
                        <Link to='/volunteers'><img src={volunteerIcon} alt='Give Icon' /></Link>
                    </li>
                    <li className={history.location.pathname === '/settings' ? 'active' : ''}>
                        <Link to='/settings'><img src={settingsIcon} alt='Give Icon' /></Link>
                    </li>
                    <li className={history.location.pathname === '/graph' ? 'active' : ''}>
                        <Link to='/reports'><img src={graphIcon} alt='Give Icon' /></Link>
                    </li>
                    <li className={history.location.pathname === '/plugin' ? 'active' : ''}>
                        <Link to='/plugin'><img src={plugIcon} alt='Give Icon' /></Link>
                    </li>
                </ul>
            </nav>
        </div>
    )
}
export default DockSider;