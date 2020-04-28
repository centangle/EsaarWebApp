import React, { useState, Suspense, useEffect, lazy } from 'react';
import { Route } from 'react-router-dom';
import { connect } from 'react-redux';
import Spinner from '../components/spinner/spinner.component';
import { fetchOrganizationStart, fetchOrgDetailStart } from '../../common/redux/organization/organization.actions';
import { fetchPeriferalItemStart } from '../../common/redux/item/item.actions';
const OrganzationOverview = lazy(() =>
  import('../components/organization/organization.overview')
);
const RequestsOverview = lazy(() =>
  import('../components/organization/requests.overview')
);
const OrganzationDetail = lazy(() =>
  import('../components/organization/organization.detail.overview')
);
const Donate = lazy(() =>
  import('../components/donate/donate.component')
);
const OrganzationPage = ({ match, fetchOrganizationStart, fetchOrgDetailStart, fetchPeriferalItemStart }) => {
  const [state, setState] = useState({ match });
  const page =  match.params.id;
  useEffect(() => {
    if (state.match.params.id === undefined) {
      fetchOrganizationStart();
    }
  }, [state.match.params.id,fetchOrganizationStart]);
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
  fetchOrganizationStart: () => dispatch(fetchOrganizationStart()),
  fetchOrgDetailStart: (Id) => dispatch(fetchOrgDetailStart(Id)),
  fetchPeriferalItemStart: () => dispatch(fetchPeriferalItemStart()),
  dispatch
});
export default connect(mapState, mapDispatch)(OrganzationPage);