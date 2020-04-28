import React from 'react';
import { Tab, Tabs, TabList, TabPanel } from '../tabs/index';
import RequestsOverview from './requests.overview';
import MembersOverview from './members.overview';
import CustomButton from '../custom-button/custom-button.component';
import { White70, White30, FlexFull, ActionRow, ListItems } from './organization.styles';
import { useHistory } from "react-router-dom";
import FileBase64 from '../logo/base64.component';
import { baseUrl } from '../../../common/utility/request';
const Removed = ({ organization, dispatch, fetchOrgItemsStart, volunteerJoining, moderatorJoining, memberJoining }) => {
    let history = useHistory();
    const handleJoin = (type) => {
        const data = {
            "Organization": {
                "Id": organization.Id
            },
            "EntityType": "Member",
            "Type": type,
        };
        dispatch({ type: 'REQUEST_START', payload: data })
        //['Owner', 'Member', 'Volunteer', 'Moderator', 'Item', 'Region']
    }
    const handleClick = (action, userType) => {
        dispatch({ type: action, payload: organization.Id, userType })
    }
    const handleDonate = () => {
        dispatch({ type: 'DONATE_START', payload: { organization } });
        history.push('/organizations/donate/' + organization.Id);
    }
    const onDone = (item) => {
        dispatch({ type: 'UPDATE_ORGANIZATION', payload: { ...organization, ImageInBase64: item.base64 } })
    }
    return (
        <Tabs className='tab'>
            <TabList>
                <Tab>Details</Tab>
                <Tab onClick={() => handleClick('FETCH_ORG_REQUESTS_START')}>Requests</Tab>
                <Tab>Tasks</Tab>
                <Tab onClick={() => handleClick('FETCH_ORG_MEMBERS_START', 'Owner')}>Owners</Tab>
                <Tab onClick={() => handleClick('FETCH_ORG_MEMBERS_START', 'Member')}>Members</Tab>
                <Tab onClick={() => handleClick('FETCH_ORG_MEMBERS_START', 'Moderator')}>Moderators</Tab>
                <Tab onClick={() => handleClick('FETCH_ORG_MEMBERS_START', 'Volunteer')}>Volunteers</Tab>
                <button onClick={() => handleDonate()} className='tab-more-button'>Donate</button>
            </TabList>
            <TabPanel>
                <div className='tab-content'>
                    <div className='left'>
                        <FileBase64 onDone={onDone}>
                            {
                                organization && organization.ImageUrl ? <img className='logo' alt="Organization Logo" src={baseUrl + '/' + organization.ImageUrl} /> : null
                            }
                        </FileBase64>
                    </div>
                    <div className='right'>
                        <h1>{organization ? organization.Name : null}</h1>
                        <ActionRow>
                            <div className=''>
                                <CustomButton handleClick={() => handleJoin('Volunteer')} loading={volunteerJoining}>
                                    <span>Join as Volunteer</span>
                                </CustomButton>
                                <CustomButton handleClick={() => handleJoin('Moderator')} loading={moderatorJoining}>
                                    <span>Request Moderation</span>
                                </CustomButton>
                                <CustomButton handleClick={() => handleJoin('Member')} loading={memberJoining}>
                                    <span> Request Membership</span>
                                </CustomButton>
                            </div>
                        </ActionRow>
                        <div>
                            <span>{organization ? organization.Description : null}</span>
                        </div>

                    </div>
                </div>
            </TabPanel>
            <TabPanel>
                <RequestsOverview />
            </TabPanel>
            <TabPanel>
                <h2>Any content 3</h2>
            </TabPanel>
            <TabPanel>
                <MembersOverview />
            </TabPanel>
            <TabPanel>
                <MembersOverview />
            </TabPanel>
            <TabPanel>
                <MembersOverview />
            </TabPanel>
            <TabPanel>
                <MembersOverview />
            </TabPanel>
        </Tabs>
    )
}