import React, { Suspense, useEffect, lazy } from 'react';
import { Route } from 'react-router-dom';
import { connect } from 'react-redux';
import Spinner from '../components/spinner/spinner.component';
import { fetchSettingStart } from '../../common/redux/setting/setting.actions';
const Setting = lazy(() =>
  import('../components/setting/setting.component')
)
const SettingPage = ({ match, fetchSettingStart }) => {
  useEffect(() => {
    fetchSettingStart();
  }, [fetchSettingStart]);
  return (
    <Suspense fallback={<Spinner />}>
      <Route
        exact
        path={`${match.path}`}
        component={Setting}
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
  fetchSettingStart: () => dispatch(fetchSettingStart()),
  dispatch
});
export default connect(mapState, mapDispatch)(SettingPage);