import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import { officesLoading } from '../../../common/redux/organization/organization.selectors';
import WithMiniWrapper from '../with-spinner/with-mini-spinner';
//import WithSpinner from '../with-spinner/with-spinner.component';
import OrganizationOffices from './organization.offices';

const mapStateToProps = createStructuredSelector({
  miniLoading: officesLoading,
  //isLoading:officesLoading
});

const OfficesOverview = compose(
  connect(mapStateToProps),
  WithMiniWrapper
)(OrganizationOffices);

export default OfficesOverview;