import React, { useState } from "react";
import { connect } from "react-redux";
import Tabular from "../grid-to-list/tabular.component";
import { useHistory } from "react-router-dom";
import { params } from "../../../common/utility/request";
import Search from "../search/search.component";
import Pagination from "react-js-pagination";
const Request = ({
  data,
  pageFilters,
  dispatch,
  organizations,
  activePage,
  totalItemsCount,
  pageRangeDisplayed,
  itemsCountPerPage,
}) => {
  let history = useHistory();
  const handleAssign = (item) => {
    dispatch({
      type: "ADD_DONATION_REQUEST_START",
      payload: {
        recordId: item.DonationRequestOrganization.Id,
        requestType: "AssignModeratorToRequest",
        DonationRequestOrganizationId: item.DonationRequestOrganization.Id,
        requestId: item.Id,
        Status: "ModeratorAssigned",
      },
    });
  };
  const handleAssignVolunteer = (item) => {
    dispatch({
      type: "ADD_DONATION_REQUEST_START",
      payload: {
        recordId: item.DonationRequestOrganization.Id,
        requestType: "AssignVolunteerToRequest",
        DonationRequestOrganizationId: item.DonationRequestOrganization.Id,
        requestId: item.Id,
        Status: "VolunteerAssigned",
      },
    });
  };
  const handleClick = (obj) => {
    //dispatch({ type: obj.Type.toUpperCase() + '_SELECTED', payload: obj });
    history.push(
      history.location.pathname + "/" + obj.DonationRequestOrganization.Id
    );
  };
  const mappedData = data.map((request) => {
    return {
      Name: request.Member.Name,
      Description:
        request.Member.Name +
        " has requested to " +
        request.Type +
        ". The current status is " +
        request.DonationRequestOrganization.Status,
      ImageUrl: request.Member.ImageUrl,
      children: [],
      Id: request.Id,
      actions: [
        {
          id: request.Id + "assign",
          item: request,
          title: "Moderate",
          handleClick: handleAssign,
          visible: request.CanModeratorSelfAssign === true,
        },
        {
          id: request.Id + "volunteer",
          item: request,
          title: "Volunteer",
          handleClick: handleAssignVolunteer,
          visible: request.CanVolunteerSelfAssign === true,
        },
        {
          id: request.Id + "view",
          item: request,
          title: "View",
          handleClick: handleClick,
          visible: request.CanAccessRequestThread === true,
        },
      ],
    };
  });
  const handleSearch = (term, filters) => {
    dispatch({
      type: "FETCH_DONATION_REQUEST_START",
      params: { ...params, name: term, filters: [filters] },
    });
  };
  const handlePageChange = (page) => {
    dispatch({
      type: "FETCH_DONATION_REQUEST_START",
      payload: "",
      params: {
        activePage: page,
        totalItemsCount,
        pageRangeDisplayed,
        itemsCountPerPage,
        filters: [pageFilters],
      },
    });
  };

  return (
    <div className="page-right">
      {/* <RequestAdder /> */}
      <Search type="donation" showFilter={true} handleSearch={handleSearch} />
      <Tabular type="REQUEST" data={mappedData} />
      <Pagination
        activePage={activePage}
        itemsCountPerPage={itemsCountPerPage}
        totalItemsCount={totalItemsCount}
        pageRangeDisplayed={pageRangeDisplayed}
        onChange={handlePageChange.bind(this)}
      />
    </div>
  );
};
const mapState = (state) => {
  const { donation, organization } = state;
  return {
    data: Object.keys(donation.donations).map((key) => {
      if (donation.donations[key].Member)
        return {
          ...donation.donations[key],
          title: donation.donations[key].Member.Name,
        };
    }),
    pageFilters: donation.selectedFilters ? donation.selectedFilters : [],
    organizations: organization.organizations,
    activePage: donation.activePage ? donation.activePage : 0,
    totalItemsCount: donation.totalItemsCount ? donation.totalItemsCount : 0,
    itemsCountPerPage: donation.itemsCountPerPage
      ? donation.itemsCountPerPage
      : 0,
    pageRangeDisplayed: donation.pageRangeDisplayed
      ? donation.pageRangeDisplayed
      : 0,
  };
};
export default connect(mapState)(Request);
