import React from 'react';
import DonateCart from './donate-cart.component';
import { connect } from 'react-redux';
export const DonateSidebar = ({organization,campaign,type,match}) =>{
    return(
        <DonateCart organization={organization} campaign={campaign} type={type} match={match} />
    )
}
export default connect()(DonateSidebar);