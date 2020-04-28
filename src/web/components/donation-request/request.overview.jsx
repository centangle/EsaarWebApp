import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import { isLoading } from '../../../common/redux/setting/setting.selectors';
import WithSpinner from '../with-spinner/with-spinner.component';
import Request from './request.component';

const mapStateToProps = createStructuredSelector({
  isLoading: isLoading
});

const RequestOverview = compose(
  connect(mapStateToProps),
  WithSpinner
)(Request);

export default RequestOverview;