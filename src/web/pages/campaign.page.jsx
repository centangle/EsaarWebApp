import React, { useState, Suspense, useEffect, lazy } from 'react';
import { Route } from 'react-router-dom';
import { connect } from 'react-redux';
import Spinner from '../components/spinner/spinner.component';
import { fetchCampaignStart, fetchCampaignDetailStart } from '../../common/redux/campaign/campaign.actions';
import { fetchPeriferalItemStart,fetchRootItemStart } from '../../common/redux/item/item.actions';
import { params } from '../../common/utility/request';

const CampaignOverview = lazy(() =>
  import('../components/campaign/campaign.overview')
);

const CampaignDetail = lazy(() =>
  import('../components/campaign/campaign.detail.overview')
);


const CampaignsPage = ({ match, fetchCampaignStart,fetchCampaignDetailStart, fetchRootItemStart }) => {
  
  const [state, setState] = useState({ match,params });
  const page =  match.params.id;
  
  useEffect(() => {
    if (state.match.params.id === undefined && state.params!==undefined) {
      fetchCampaignStart(state.params);
      fetchRootItemStart();
    }
  }, [state.match.params.id,fetchCampaignStart,state.params,fetchRootItemStart]);
  useEffect(()=>{
    if(page!==undefined)
    fetchCampaignDetailStart(page);
  },[fetchCampaignDetailStart,page]);
  return (
    <Suspense fallback={<Spinner />}>
      <Route
        exact
        path='/campaigns'
        component={CampaignOverview}
      />
      <Route
        exact
        path='/campaigns/:id'
        component={CampaignDetail}
      />
      <Route
        exact
        path="/campaigns/:id/:slug"
        component={CampaignDetail}
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
  fetchCampaignStart: (params) => dispatch(fetchCampaignStart(params)),
  fetchCampaignDetailStart: (Id) => dispatch(fetchCampaignDetailStart(Id)),
  fetchPeriferalItemStart: () => dispatch(fetchPeriferalItemStart()),
  fetchRootItemStart:()=>dispatch(fetchRootItemStart()),
  dispatch
});
export default connect(mapState, mapDispatch)(CampaignsPage);