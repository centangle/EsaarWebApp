import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import { itemsLoading } from '../../../common/redux/organization/organization.selectors';
import WithMiniWrapper from '../with-spinner/with-mini-spinner';
//import WithSpinner from '../with-spinner/with-spinner.component';
import Donate from './donate.component';

const mapStateToProps = createStructuredSelector({
  miniLoading: itemsLoading,
  //isLoading:requestsLoading
});

const DonateOverview = compose(
  connect(mapStateToProps),
  WithMiniWrapper
)(Donate);

export default DonateOverview;