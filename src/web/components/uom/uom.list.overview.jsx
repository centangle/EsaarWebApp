import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import { uomLoading } from '../../../common/redux/uom/uom.selectors';
import WithSpinner from '../with-spinner/with-spinner.component';
import UomList from './uom.list.component';

const mapStateToProps = createStructuredSelector({
  isLoading: uomLoading
});

const UomListOverview = compose(
  connect(mapStateToProps),
  WithSpinner
)(UomList);

export default UomListOverview;