import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import { isLoading } from '../../../common/redux/setting/setting.selectors';
import WithSpinner from '../with-spinner/with-spinner.component';
import Organization from './organization.component';

const mapStateToProps = createStructuredSelector({
  isLoading: isLoading
});

const OrganizationOverview = compose(
  connect(mapStateToProps),
  WithSpinner
)(Organization);

export default OrganizationOverview;