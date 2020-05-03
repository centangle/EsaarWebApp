import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import { eventsLoading } from '../../../common/redux/event/event.selectors';
import WithMiniWrapper from '../with-spinner/with-mini-spinner';
//import WithSpinner from '../with-spinner/with-spinner.component';
import Event from './event.component';

const mapStateToProps = createStructuredSelector({
  miniLoading: eventsLoading,
  //isLoading:accountsLoading
});

const AccountsOverview = compose(
  connect(mapStateToProps),
  WithMiniWrapper
)(Event);

export default AccountsOverview;