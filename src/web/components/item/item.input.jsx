import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import { inputLoading } from '../../../common/redux/item/item.selectors';
import WithSpinner from '../with-spinner/with-spinner.component';
import ItemInputContainer from './item.input.container';

const mapStateToProps = createStructuredSelector({
  isLoading: inputLoading
});

const ItemInput = compose(
  connect(mapStateToProps),
  WithSpinner
)(ItemInputContainer);

export default ItemInput;