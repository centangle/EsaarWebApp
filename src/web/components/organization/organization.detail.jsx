import React, { useEffect,useState,Suspense } from 'react';
import { Route, Switch } from "react-router-dom";
import Spinner from '../spinner/spinner.component';
import { White70, White30, FlexFull, ActionRow, ListItems, Row } from './organization.styles';
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
import TasksOverview from './tasks.overview';
import StatsOverview from './stats.overview';

import { fetchOrgItemsStart,fetchOrgRequestsStart,fetchOrgCampaignsStart } from '../../../common/redux/organization/organization.actions';

import OrganizationHeader from './organization.header';
import OrganizationSidebar from './organization.sidebar';
import OrganizationHome from './organization.home';
import DonateSideBar from '../donate/donate.sidebar.component';
import './organization.styles.scss';
import { params } from '../../../common/utility/request';

const OrganizationDetail = ({ organization,match, dispatch, fetchOrgItemsStart,fetchOrgRequestsStart,fetchOrgCampaignsStart, volunteerJoining, moderatorJoining, memberJoining }) => {
    const [state, setState] = useState({ match });
    const id = match.params.id;
    const slug = match.params.slug;
    useEffect(() => {
        switch (match.params.slug) {
            case 'requests':
                return fetchOrgRequestsStart({type:'FETCH_ORG_REQUESTS_START',id,params});
            case 'packages':
                fetchOrgRequestsStart({type:'FETCH_ORG_ITEMS_START',id,params});
                return fetchOrgRequestsStart({type:'FETCH_ORG_PACKAGES_START',id,params});
            case 'volunteers':
                return fetchOrgRequestsStart({type:'FETCH_ORG_MEMBERS_START',id,userType:'Volunteer',params});
            case 'modarators':
                return fetchOrgRequestsStart({type:'FETCH_ORG_MEMBERS_START',id,userType:'Moderator',params});
            case 'members':
                return fetchOrgRequestsStart({type:'FETCH_ORG_MEMBERS_START',id,userType:'Member',params});
            case 'owners':
                return fetchOrgRequestsStart({type:'FETCH_ORG_MEMBERS_START',id,userType:'Owner',params});
            case 'campaigns':
                fetchOrgRequestsStart({type:'FETCH_EVENT_START',id,params:{...params,disablePagination:true}});
                fetchOrgRequestsStart({type:'FETCH_ORG_ITEMS_START',id,params});
                return fetchOrgRequestsStart({type:'FETCH_ORG_CAMPAIGNS_START',id,params});
            case 'donate':
                return fetchOrgRequestsStart({type:'FETCH_ORG_ITEMS_START',id,params});
            case 'get-donation':
                return fetchOrgRequestsStart({type:'FETCH_ORG_ITEMS_START',id,params});
            case 'offices':
                return fetchOrgRequestsStart({type:'FETCH_ORG_OFFICES_START',id,userType:'Offices',params});
            case 'accounts':
                return fetchOrgRequestsStart({type:'FETCH_ORG_ACCOUNTS_START',id,userType:'Accounts',params});
                //return fetchOrgCampaignsStart(organization.Id);
            case 'items':
                fetchOrgRequestsStart({type:'FETCH_PERIFERAL_ITEMS_START',id,params})
                return fetchOrgRequestsStart({type:'FETCH_ORG_ITEMS_START',id,params});
            case 'attachments':
                return fetchOrgRequestsStart({type:'FETCH_ORG_ATTACHMENTS_START',id,params});
            case 'regions':
                fetchOrgRequestsStart({type:'FETCH_COUNTRIES_START',id,params});
                return fetchOrgRequestsStart({type:'FETCH_ORG_REGIONS_START',id,params});
            case undefined:
                fetchOrgRequestsStart({type:'FETCH_ORG_CAMPAIGNS_START',id,params});
                fetchOrgRequestsStart({type:'FETCH_ORG_OFFICES_START',id,userType:'Offices',params});
                fetchOrgRequestsStart({type:'FETCH_ORG_ATTACHMENTS_START',id,userType:'Attachments',params});
                return fetchOrgRequestsStart({type:'FETCH_ORG_CATEGORIES_START',id,params});
            default:
                return;
        }
    }, [fetchOrgItemsStart,fetchOrgRequestsStart,fetchOrgCampaignsStart,match.params.slug,id]);
    return (
        <div className='page-right'>
            <FlexFull>
                <White70>
                    <OrganizationHeader organization={organization} />
                    <Switch>
                        <Suspense fallback={<Spinner />}>
                        <Route exact path='/organizations/:id'>
                            <OrganizationHome organization={organization} />
                        </Route>
                        <Route exact path='/organizations/:id/requests'>
                            <RequestsOverview organization={organization} />
                        </Route>
                        <Route exact path='/organizations/:id/packages'>
                            <PackagesOverview organization={organization} />
                        </Route>
                        <Route exact path='/organizations/:id/regions'>
                            <RegionsOverview organization={organization} />
                        </Route>
                        <Route exact path='/organizations/:id/campaigns'>
                            <CampaignsOverview organization={organization} type='Campaigns' />
                        </Route>
                        <Route exact path='/organizations/:id/members'>
                            <MembersOverview organization={organization} type='Member' />
                        </Route>
                        <Route exact path='/organizations/:id/modarators'>
                            <MembersOverview organization={organization} type='Modarator' />
                        </Route>
                        <Route exact path='/organizations/:id/owners'>
                            <MembersOverview organization={organization} type='Owner' />
                        </Route>
                        <Route exact path='/organizations/:id/volunteers'>
                            <MembersOverview organization={organization} type='Volunteer' />
                        </Route>
                        <Route exact path='/organizations/:id/items'>
                            <ItemsOverview organization={organization} type='Items' />
                        </Route>
                        <Route exact path='/organizations/:id/offices'>
                            <OfficesOverview organization={organization} type='Offices' />
                        </Route>
                        <Route exact path='/organizations/:id/accounts'>
                            <AccountsOverview organization={organization} type='Accounts' />
                        </Route>
                        <Route exact path='/organizations/:id/attachments'>
                            <AttachmentsOverview organization={organization} type='Volunteer' />
                        </Route>
                        <Route exact path='/organizations/:id/donate'>
                            <DonateOverview organization={organization} type='organization' />
                        </Route>
                        <Route exact path='/organizations/:id/get-donation'>
                            <DonateOverview organization={organization} type='organization' />
                        </Route>
                        <Route exact path='/organizations/:id/tasks'>
                            <TasksOverview organization={organization} type='Task' />
                        </Route>
                        <Route exact path='/organizations/:id/stats'>
                            <StatsOverview organization={organization} type='Stats' />
                        </Route>
                        </Suspense>
                    </Switch>
                </White70>
                <White30>
                    <ListItems>
                        <Switch>
                            <Route exact path='/organizations/:id'>
                                <OrganizationSidebar organization={organization} />
                            </Route>
                            <Route exact path={`/organizations/:id/${(slug!=='donate' && slug!=='get-donation')?slug:'none'}`}>
                                <OrganizationSidebar organization={organization} />
                            </Route>
                            <Route exact path={`/organizations/:id/${(slug==='donate' || slug==='get-donation')?slug:'none'}`}>
                                <DonateSideBar organization={organization} type="organization" match={match}  />
                            </Route>
                        </Switch>
                    </ListItems>
                </White30>
            </FlexFull>
        </div>

    )
}
const mapState = (state) => {
    const { organization } = state;
    const { volunteerJoining, moderatorJoining, memberJoining } = organization;
    return {
        organization: organization.current,
        volunteerJoining, moderatorJoining, memberJoining
    }
}
const mapDispatch = dispatch => ({
    fetchOrgItemsStart: (Id) => dispatch(fetchOrgItemsStart(Id)),
    fetchOrgRequestsStart:(type,id,userType)=>dispatch(fetchOrgRequestsStart(type,id,userType)),
    fetchOrgCampaignsStart:(id)=>dispatch(fetchOrgCampaignsStart(id)),
    dispatch
});
export default connect(mapState, mapDispatch)(OrganizationDetail)