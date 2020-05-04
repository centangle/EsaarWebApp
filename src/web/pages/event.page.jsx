import React, { Suspense, useEffect, lazy } from 'react';
import { Route } from 'react-router-dom';
import { connect } from 'react-redux';
import Spinner from '../components/spinner/spinner.component';
import { fetchEventStart } from '../../common/redux/event/event.actions';
import { params } from '../../common/utility/request';
const EventOverview = lazy(() =>
  import('../components/event/event.overview')
)
const EventPage = ({ match, fetchEventStart }) => {
  useEffect(() => {
    fetchEventStart(params);
  }, [fetchEventStart]);
  return (
    <Suspense fallback={<Spinner />}>
      <Route
        exact
        path={`${match.path}`}
        component={EventOverview}
      />
    </Suspense>
  )
}
const mapState = (state) => {
  const { setting } = state;
  return {
    isLoading: setting.isLoading
  }
}
const mapDispatch = dispatch => ({
  fetchEventStart: (params) => dispatch(fetchEventStart(params)),
  dispatch
});
export default connect(mapState, mapDispatch)(EventPage);