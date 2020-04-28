import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import { isLoading } from '../../../common/redux/setting/setting.selectors';
import WithSpinner from '../with-spinner/with-spinner.component';
import RequestDetail from './request.detail';

const mapStateToProps = createStructuredSelector({
  isLoading: isLoading
});

const RequestDetailOverview = compose(
  connect(mapStateToProps),
  WithSpinner
)(RequestDetail);

export default RequestDetailOverview;