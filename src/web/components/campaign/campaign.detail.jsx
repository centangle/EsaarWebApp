import React, { useEffect,useState,Suspense } from 'react';
import { Route, Switch } from "react-router-dom";
import Spinner from '../spinner/spinner.component';
import { White70, White30, FlexFull, ActionRow, ListItems, Row } from './campaign.styles';
import { connect } from 'react-redux';

import RequestsOverview from './requests.overview';
import PackagesOverview from './packages.overview';
import MembersOverview from './members.overview';
import ItemsOverview from './items.overview';
import CampaignsOverview from './campaigns.overview';
import DonateOverview from '../donate/donate.overview';
import OfficesOverview from './offices.overview';
import AttachmentsOverview from './attachments.overview';
import AccountsOverview from './accounts.overview';
import RegionsOverview from './regions.overview';

import { fetchCampaignItemsStart,fetchCampaignRequestsStart,fetchCampaignCampaignsStart } from '../../../common/redux/campaign/campaign.actions';

import CampaignHeader from './campaign.header';
import CampaignSidebar from './campaign.sidebar';
import CampaignHome from './campaign.home';
import DonateSideBar from '../donate/donate.sidebar.component';
import './campaign.styles.scss';
import { params } from '../../../common/utility/request';

const CampaignDetail = ({ campaign,match, dispatch, fetchCampaignItemsStart,fetchCampaignRequestsStart,fetchCampaignCampaignsStart, volunteerJoining, moderatorJoining, memberJoining }) => {
    const [state, setState] = useState({ match });
    const id = match.params.id;
    const slug = match.params.slug;
    useEffect(() => {
        switch (match.params.slug) {
            case 'requests':
                return fetchCampaignRequestsStart({type:'FETCH_CAMPAIGN_REQUESTS_START',payload:{id},params});
            case 'packages':
                fetchCampaignRequestsStart({type:'FETCH_CAMPAIGN_ITEMS_START',payload:{id},params});
                return fetchCampaignRequestsStart({type:'FETCH_CAMPAIGN_PACKAGES_START',payload:{id},params});
            case 'volunteers':
                return fetchCampaignRequestsStart({type:'FETCH_CAMPAIGN_MEMBERS_START',payload:{id},userType:'Volunteer',params});
            case 'modarators':
                return fetchCampaignRequestsStart({type:'FETCH_CAMPAIGN_MEMBERS_START',payload:{id},userType:'Moderator',params});
            case 'members':
                return fetchCampaignRequestsStart({type:'FETCH_CAMPAIGN_MEMBERS_START',payload:{id},userType:'Member',params});
            case 'owners':
                return fetchCampaignRequestsStart({type:'FETCH_CAMPAIGN_MEMBERS_START',payload:{id},userType:'Owner',params});
            case 'campaigns':
                fetchCampaignRequestsStart({type:'FETCH_CAMPAIGN_ITEMS_START',payload:{id},params});
                return fetchCampaignRequestsStart({type:'FETCH_CAMPAIGN_CAMPAIGNS_START',payload:{id},params});
            case 'donate':
                return fetchCampaignRequestsStart({type:'FETCH_CAMPAIGN_ITEMS_START',payload:{id},params});
            case 'get-donation':
                return fetchCampaignRequestsStart({type:'FETCH_CAMPAIGN_ITEMS_START',payload:{id},params});
            case 'offices':
                return fetchCampaignRequestsStart({type:'FETCH_CAMPAIGN_OFFICES_START',payload:{id},userType:'Offices',params});
            case 'accounts':
                return fetchCampaignRequestsStart({type:'FETCH_CAMPAIGN_ACCOUNTS_START',payload:{id},userType:'Accounts',params});
                //return fetchCampaignCampaignsStart(campaign.Id);
            case 'items':
                //fetchCampaignRequestsStart({type:'FETCH_PERIFERAL_ITEMS_START',payload:{id},params});
                dispatch({type:'FETCH_ORG_ITEMS_START',payload:id,params});
                fetchCampaignRequestsStart({type:'FETCH_UOM_START',payload:true,params});
                return fetchCampaignRequestsStart({type:'FETCH_CAMPAIGN_ITEMS_START',payload:{id},params});
            case 'attachments':
                return fetchCampaignRequestsStart({type:'FETCH_CAMPAIGN_ATTACHMENTS_START',payload:{id},params});
            case 'regions':
                fetchCampaignRequestsStart({type:'FETCH_COUNTRIES_START',payload:{id},params});
                return fetchCampaignRequestsStart({type:'FETCH_CAMPAIGN_REGIONS_START',payload:{id},params});
            case undefined:
                fetchCampaignRequestsStart({type:'FETCH_CAMPAIGN_CAMPAIGNS_START',payload:{id},params});
                fetchCampaignRequestsStart({type:'FETCH_CAMPAIGN_ATTACHMENTS_START',payload:{id},userType:'Attachments',params});
                return fetchCampaignRequestsStart({type:'FETCH_CAMPAIGN_CATEGORIES_START',payload:{id},params});
            default:
                return;
        }
    }, [fetchCampaignItemsStart,fetchCampaignRequestsStart,fetchCampaignCampaignsStart,match.params.slug,id,dispatch]);
    return (
        <div className='page-right'>
            <FlexFull>
                <White70>
                    <CampaignHeader campaign={campaign} />
                    <Switch>
                        <Suspense fallback={<Spinner />}>
                        <Route exact path='/campaigns/:id'>
                            <CampaignHome campaign={campaign} />
                        </Route>
                        <Route exact path='/campaigns/:id/requests'>
                            <RequestsOverview campaign={campaign} />
                        </Route>
                        <Route exact path='/campaigns/:id/packages'>
                            <PackagesOverview campaign={campaign} />
                        </Route>
                        <Route exact path='/campaigns/:id/regions'>
                            <RegionsOverview campaign={campaign} />
                        </Route>
                        <Route exact path='/campaigns/:id/campaigns'>
                            <CampaignsOverview campaign={campaign} type='Campaigns' />
                        </Route>
                        <Route exact path='/campaigns/:id/members'>
                            <MembersOverview campaign={campaign} type='Member' />
                        </Route>
                        <Route exact path='/campaigns/:id/modarators'>
                            <MembersOverview campaign={campaign} type='Modarator' />
                        </Route>
                        <Route exact path='/campaigns/:id/owners'>
                            <MembersOverview campaign={campaign} type='Owner' />
                        </Route>
                        <Route exact path='/campaigns/:id/volunteers'>
                            <MembersOverview campaign={campaign} type='Volunteer' />
                        </Route>
                        <Route exact path='/campaigns/:id/items'>
                            <ItemsOverview campaign={campaign} type='Items' />
                        </Route>
                        <Route exact path='/campaigns/:id/offices'>
                            <OfficesOverview campaign={campaign} type='Offices' />
                        </Route>
                        <Route exact path='/campaigns/:id/accounts'>
                            <AccountsOverview campaign={campaign} type='Accounts' />
                        </Route>
                        <Route exact path='/campaigns/:id/attachments'>
                            <AttachmentsOverview campaign={campaign} type='Volunteer' />
                        </Route>
                        <Route exact path='/campaigns/:id/donate'>
                            <DonateOverview campaign={campaign} type='campaign' />
                        </Route>
                        <Route exact path='/campaigns/:id/get-donation'>
                            <DonateOverview campaign={campaign} type='campaign' />
                        </Route>
                        </Suspense>
                    </Switch>
                </White70>
                <White30>
                    <ListItems>
                        <Switch>
                            <Route exact path='/campaigns/:id'>
                                <CampaignSidebar campaign={campaign} />
                            </Route>
                            <Route exact path={`/campaigns/:id/${(slug!=='donate' && slug!=='get-donation')?slug:'none'}`}>
                                <CampaignSidebar campaign={campaign} />
                            </Route>
                            <Route exact path={`/campaigns/:id/${(slug==='donate' || slug==='get-donation')?slug:'none'}`}>
                                <DonateSideBar campaign={campaign} type="campaign" match={match}  />
                            </Route>
                        </Switch>
                    </ListItems>
                </White30>
            </FlexFull>
        </div>

    )
}
const mapState = (state) => {
    const { campaign } = state;
    const { volunteerJoining, moderatorJoining, memberJoining } = campaign;
    return {
        campaign: campaign.current?campaign.current:{},
        volunteerJoining, moderatorJoining, memberJoining
    }
}
const mapDispatch = dispatch => ({
    fetchCampaignItemsStart: (Id) => dispatch(fetchCampaignItemsStart(Id)),
    fetchCampaignRequestsStart:(type,id,userType)=>dispatch(fetchCampaignRequestsStart(type,id,userType)),
    fetchCampaignCampaignsStart:(id)=>dispatch(fetchCampaignCampaignsStart(id)),
    dispatch
});
export default connect(mapState, mapDispatch)(CampaignDetail)