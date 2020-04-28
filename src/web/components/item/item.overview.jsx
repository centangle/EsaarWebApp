import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import { isLoading } from '../../../common/redux/setting/setting.selectors';
import WithSpinner from '../with-spinner/with-spinner.component';
import Item from './item.component';

const mapStateToProps = createStructuredSelector({
  isLoading: isLoading
});

const ItemOverview = compose(
  connect(mapStateToProps),
  WithSpinner
)(Item);

export default ItemOverview;