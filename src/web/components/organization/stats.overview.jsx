import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import { statsLoading } from '../../../common/redux/organization/organization.selectors';
import WithMiniWrapper from '../with-spinner/with-mini-spinner';
//import WithSpinner from '../with-spinner/with-spinner.component';
import OrganizationStats from './organization.stats';

const mapStateToProps = createStructuredSelector({
  miniLoading: statsLoading,
  //isLoading:statsLoading
});

const StatsOverview = compose(
  connect(mapStateToProps),
  WithMiniWrapper
)(OrganizationStats);

export default StatsOverview;