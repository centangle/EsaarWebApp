import React, { useState,Suspense, useEffect,lazy } from 'react';
import { Route } from 'react-router-dom';
import { connect } from 'react-redux';
import Spinner from '../components/spinner/spinner.component';
import { fetchDonationRequestStart,fetchDonationRequestStatus } from '../../common/redux/donation/donation.actions';
const RequestOverview = lazy(() =>
import('../components/donation-request/request.overview')
)
const RequestDetail = lazy(() =>
  import('../components/donation-request/request.detail.overview')
);
const DonationPage = ({ match,fetchDonationRequestStart,fetchDonationRequestStatus }) => {
  const [state,setState] = useState({match});
  useEffect(() => {
    if(state.match.params.id===undefined){
        fetchDonationRequestStart();
    }
  }, [fetchDonationRequestStart,state.match]);
  useEffect(()=>{
    fetchDonationRequestStatus();
  },[fetchDonationRequestStatus])
  return (
    <Suspense fallback={<Spinner />}>
      <Route
        exact
        path="/donation-requests"
        component={RequestOverview}
      />
      <Route
        exact
        path="/donation-requests/:id"
        component={RequestDetail}
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
  fetchDonationRequestStart: () => dispatch(fetchDonationRequestStart()),
  fetchDonationRequestStatus:()=>dispatch(fetchDonationRequestStatus()),
  dispatch
});
export default connect(mapState, mapDispatch)(DonationPage);