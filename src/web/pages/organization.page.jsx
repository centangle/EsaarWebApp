import React, { useState, Suspense, useEffect, lazy } from 'react';
import { Route } from 'react-router-dom';
import { connect } from 'react-redux';
import Spinner from '../components/spinner/spinner.component';
import { fetchOrganizationStart, fetchOrgDetailStart } from '../../common/redux/organization/organization.actions';
import { fetchPeriferalItemStart } from '../../common/redux/item/item.actions';
import { params } from '../../common/utility/request';

const OrganzationOverview = lazy(() =>
  import('../components/organization/organization.overview')
);

const OrganzationDetail = lazy(() =>
  import('../components/organization/organization.detail.overview')
);


const OrganzationPage = ({ match, fetchOrganizationStart, fetchOrgDetailStart, fetchPeriferalItemStart }) => {
  
  const [state, setState] = useState({ match,params });
  const page =  match.params.id;
  
  useEffect(() => {
    if (state.match.params.id === undefined && state.params!==undefined) {
      fetchOrganizationStart(state.params);
    }
  }, [state.match.params.id,fetchOrganizationStart,state.params]);
  useEffect(()=>{
    if(page!==undefined)
    fetchOrgDetailStart(page);
  },[fetchOrgDetailStart,page]);
  return (
    <Suspense fallback={<Spinner />}>
      <Route
        exact
        path='/organizations'
        component={OrganzationOverview}
      />
      <Route
        exact
        path='/organizations/:id'
        component={OrganzationDetail}
      />
      <Route
        exact
        path="/organizations/:id/:slug"
        component={OrganzationDetail}
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
  fetchOrganizationStart: (params) => dispatch(fetchOrganizationStart(params)),
  fetchOrgDetailStart: (Id) => dispatch(fetchOrgDetailStart(Id)),
  fetchPeriferalItemStart: () => dispatch(fetchPeriferalItemStart()),
  dispatch
});
export default connect(mapState, mapDispatch)(OrganzationPage);