import React, { Suspense, useEffect,lazy } from 'react';
import { Route } from 'react-router-dom';
import { connect } from 'react-redux';
import Spinner from '../components/spinner/spinner.component';
import { fetchItemStart } from '../../common/redux/item/item.actions';
const ItemOverview = lazy(() =>
import('../components/item/item.overview')
)
const ItemPage = ({ match, fetchItemStart }) => {
  useEffect(() => {
    fetchItemStart();
  }, [fetchItemStart]);
  return (
    <Suspense fallback={<Spinner />}>
      <Route
        exact
        path={`${match.path}`}
        component={ItemOverview}
      />
      <Route
        exact
        path={`${match.path}/:id`}
        component={ItemOverview}
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
  fetchItemStart: () => dispatch(fetchItemStart()),
  dispatch
});
export default connect(mapState, mapDispatch)(ItemPage);