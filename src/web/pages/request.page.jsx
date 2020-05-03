import React, { useState,Suspense, useEffect,lazy } from 'react';
import { Route } from 'react-router-dom';
import { connect } from 'react-redux';
import Spinner from '../components/spinner/spinner.component';
import { fetchRequestStart,fetchRequestThreadStart,fetchRequestStatus } from '../../common/redux/request/request.actions';
import { params } from '../../common/utility/request';
const RequestOverview = lazy(() =>
import('../components/request/request.overview')
)
const RequestDetail = lazy(() =>
  import('../components/request/request.detail.overview')
);
const RequestPage = ({ match, fetchRequestStart,fetchRequestThreadStart,fetchRequestStatus }) => {
  const [state,setState] = useState({match});
  useEffect(() => {
    if(state.match.params.id===undefined){
      fetchRequestStart(params);
    }else{
      fetchRequestThreadStart(state.match.params.id);
    }
  }, [fetchRequestStart,fetchRequestThreadStart,state.match]);
  useEffect(()=>{
    fetchRequestStatus();
  },[fetchRequestStatus])
  return (
    <Suspense fallback={<Spinner />}>
      <Route
        exact
        path="/requests"
        component={RequestOverview}
      />
      <Route
        exact
        path="/requests/:id"
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
  fetchRequestStart: (params) => dispatch(fetchRequestStart(params)),
  fetchRequestThreadStart: (Id)=>dispatch(fetchRequestThreadStart(Id)),
  fetchRequestStatus:()=>dispatch(fetchRequestStatus()),
  dispatch
});
export default connect(mapState, mapDispatch)(RequestPage);