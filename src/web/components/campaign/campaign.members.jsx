import React from 'react';
import { connect } from 'react-redux';
import Tabular from '../grid-to-list/tabular.component';
import { useHistory } from "react-router-dom";
import GridToList from '../grid-to-list/grid-to-list.component';
import Pagination from "react-js-pagination";
const CampaignMembers = ({ members,campaign, campaigns, dispatch,type,activePage,totalItemsCount,pageRangeDisplayed,itemsCountPerPage }) => {
  let history = useHistory();
  const handleAssign = (item) => {
    dispatch({ type: 'ASSIGN_MEMBER_START', payload: { campaignId: item.Campaign.Id, memberId: item.Id } });
  }
  const handleClick = (obj) => {
    dispatch({ type: obj.Type + '_SELECTED', payload: obj });
    history.push('/members/' + obj.Id);
  }
  const mappedData = members?members.map(member => {
    return {
      Name: member.Member.Name,
      Description: member.Member.Name,
      ImageUrl: campaigns[member.Campaign.Id] ? campaigns[member.Campaign.Id].ImageUrl : null,
      children: [], Id: member.Id,
      actions: [

      ]
    }
  }):{};
    const handlePageChange = (page) =>{
    dispatch({
      type:'FETCH_CAMPAIGN_MEMBERS_START',payload:campaign.Id,userType:type,
      params:{activePage:page,totalItemsCount,pageRangeDisplayed,itemsCountPerPage}
      })
  }
  return (
    <div>
      <h2>Campaign {type}s</h2>
      <GridToList handleClick={handleClick} type='CAMPAIGN' data={mappedData} />
      <Pagination
          activePage={activePage}
          itemsCountPerPage={itemsCountPerPage}
          totalItemsCount={totalItemsCount}
          pageRangeDisplayed={pageRangeDisplayed}
          onChange={handlePageChange.bind(this)}
        />
    </div>
  )
}
const mapState = (state) => {
  const { campaign } = state;
  return {
    members: campaign.members,
    campaigns: campaign.campaigns,
    activePage:campaign && campaign.activePage ?campaign.activePage:0,
    totalItemsCount:campaign && campaign.totalItemsCount ?campaign.totalItemsCount:0,
    itemsCountPerPage:campaign && campaign.itemsCountPerPage ?campaign.itemsCountPerPage:0,
    pageRangeDisplayed:campaign && campaign.pageRangeDisplayed ?campaign.pageRangeDisplayed:0
  }
}
export default connect(mapState)(CampaignMembers);