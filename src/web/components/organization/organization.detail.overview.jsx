import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import { isLoading } from '../../../common/redux/setting/setting.selectors';
import WithSpinner from '../with-spinner/with-spinner.component';
import OrganizationDetail from './organization.detail';

const mapStateToProps = createStructuredSelector({
  isLoading: isLoading
});

const OrganizationDetailOverview = compose(
  connect(mapStateToProps),
  WithSpinner
)(OrganizationDetail);

export default OrganizationDetailOverview;