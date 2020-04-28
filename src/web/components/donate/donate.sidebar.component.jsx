import React from 'react';
import DonateCart from './donate-cart.component';
import { connect } from 'react-redux';
export const DonateSidebar = ({organization,match}) =>{
    return(
        <DonateCart organization={organization} match={match} />
    )
}
export default connect()(DonateSidebar);