import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import { uomLoading } from '../../../common/redux/setting/setting.selectors';
import WithSpinner from '../with-spinner/with-spinner.component';
import Uom from './uom.component';

const mapStateToProps = createStructuredSelector({
  isLoading: uomLoading
});

const UomInput = compose(
  connect(mapStateToProps),
  WithSpinner
)(Uom);

export default UomInput;