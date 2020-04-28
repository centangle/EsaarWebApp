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

import { fetchOrgItemsStart,fetchOrgRequestsStart,fetchOrgCampaignsStart } from '../../../common/redux/organization/organization.actions';

import OrganizationHeader from './organization.header';
import OrganizationSidebar from './organization.sidebar';
import OrganizationHome from './organization.home';
import DonateSideBar from '../donate/donate.sidebar.component';
import './organization.styles.scss';


const OrganizationDetail = ({ organization,match, dispatch, fetchOrgItemsStart,fetchOrgRequestsStart,fetchOrgCampaignsStart, volunteerJoining, moderatorJoining, memberJoining }) => {
    const [state, setState] = useState({ match });
    const id = match.params.id;
    const slug = match.params.slug;
    useEffect(() => {
        switch (match.params.slug) {
            case 'requests':
                return fetchOrgRequestsStart('FETCH_ORG_REQUESTS_START',id);
            case 'packages':
                fetchOrgRequestsStart('FETCH_ORG_ITEMS_START',id);
                return fetchOrgRequestsStart('FETCH_ORG_PACKAGES_START',id);
            case 'volunteers':
                return fetchOrgRequestsStart('FETCH_ORG_MEMBERS_START',id,'Volunteer');
            case 'modarators':
                return fetchOrgRequestsStart('FETCH_ORG_MEMBERS_START',id,'Moderator');
            case 'members':
                return fetchOrgRequestsStart('FETCH_ORG_MEMBERS_START',id,'Member');
            case 'owners':
                return fetchOrgRequestsStart('FETCH_ORG_MEMBERS_START',id,'Owner');
            case 'campaigns':
                fetchOrgRequestsStart('FETCH_ORG_ITEMS_START',id);
                return fetchOrgRequestsStart('FETCH_ORG_CAMPAIGNS_START',id);
            case 'donate':
                return fetchOrgRequestsStart('FETCH_ORG_ITEMS_START',id);
            case 'get-donation':
                return fetchOrgRequestsStart('FETCH_ORG_ITEMS_START',id);
            case 'offices':
                return fetchOrgRequestsStart('FETCH_ORG_OFFICES_START',id,'Offices');
            case 'accounts':
                return fetchOrgRequestsStart('FETCH_ORG_ACCOUNTS_START',id,'Accounts');
                //return fetchOrgCampaignsStart(organization.Id);
            case 'items':
                fetchOrgRequestsStart('FETCH_PERIFERAL_ITEMS_START',id)
                return fetchOrgRequestsStart('FETCH_ORG_ITEMS_START',id);
            case 'attachments':
                return fetchOrgRequestsStart('FETCH_ORG_ATTACHMENTS_START',id);
            case 'regions':
                fetchOrgRequestsStart('FETCH_COUNTRIES_START',id);
                return fetchOrgRequestsStart('FETCH_ORG_REGIONS_START',id);
            case undefined:
                fetchOrgRequestsStart('FETCH_ORG_CAMPAIGNS_START',id);
                fetchOrgRequestsStart('FETCH_ORG_OFFICES_START',id,'Offices');
                fetchOrgRequestsStart('FETCH_ORG_ATTACHMENTS_START',id,'Attachments');
                return fetchOrgRequestsStart('FETCH_ORG_CATEGORIES_START',id);
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
                            <DonateOverview organization={organization} type='Donate' />
                        </Route>
                        <Route exact path='/organizations/:id/get-donation'>
                            <DonateOverview organization={organization} type='Donate' />
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
                                <DonateSideBar organization={organization} match={match}  />
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