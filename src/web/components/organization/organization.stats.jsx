import React from 'react';
import { connect } from 'react-redux';
import {CommingSoon} from './organization.styles';

const OrganizationStats = () =>{
    return(
        <CommingSoon>
            <h1>comming soon...</h1>
        </CommingSoon>
    )
}
export default connect()(OrganizationStats);