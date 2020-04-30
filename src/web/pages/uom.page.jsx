import React, { Suspense, useEffect, lazy } from 'react';
import { Route } from 'react-router-dom';
import { connect } from 'react-redux';
import Spinner from '../components/spinner/spinner.component';
import { fetchUomStart } from '../../common/redux/uom/uom.actions';
const UomListOverview = lazy(() =>
  import('../components/uom/uom.list.overview')
)
const UomPage = ({ match, fetchUomStart }) => {
  useEffect(() => {
    fetchUomStart();
  }, [fetchUomStart]);
  return (
    <Suspense fallback={<Spinner />}>
      <Route
        exact
        path={`${match.path}`}
        component={UomListOverview}
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
  fetchUomStart: () => dispatch(fetchUomStart()),
  dispatch
});
export default connect(mapState, mapDispatch)(UomPage);