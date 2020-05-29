import React, { useState } from "react";
import { connect } from "react-redux";
import CampaignAdder from "./campaign.adder";
import GridToList from "../grid-to-list/grid-to-list.component";
import { useHistory } from "react-router-dom";
import Modal from "../modal/modal.component";
import { TitleWithAction, FormHolder } from "./campaign.styles";
import Search from "../search/search.component";
import Pagination from "react-js-pagination";
import { params } from "../../../common/utility/request";
import RegionSelector from "../region/region.selector";
const CAMPAIGNanzation = ({
  regions,
  data,
  dispatch,
  form,
  campaignModal,
  activePage,
  totalItemsCount,
  pageRangeDisplayed,
  itemsCountPerPage,
  pageFilters
}) => {
  let history = useHistory();
  const [state, setState] = useState({ treeData: data, volunteer: false, id: 0 });
  const closeModal = () => {
    dispatch({ type: "CLOSE_MODAL", payload: "CAMPAIGN" });
  };
  const handleAddCampaign = () => {
    dispatch({ type: "OPEN_MODAL", payload: "CAMPAIGN" });
  };
  const handleClick = (obj) => {
    dispatch({ type: "CAMPAIGN_SELECTED", payload: obj });
    history.push(history.location.pathname + "/" + obj.Id);
  };
  const handleSearch = (term, filters) => {
    dispatch({
      type: "FETCH_CAMPAIGN_START",
      params: { ...params, name: term, filters: [filters] },
    });
  };
  const handlePageChange = (page) => {
    dispatch({
      type: "FETCH_CAMPAIGN_START",
      payload: "",
      params: {
        activePage: page,
        totalItemsCount,
        pageRangeDisplayed,
        itemsCountPerPage,
        filters: [pageFilters]
      },
    });
  };
  const closeVolunteer = () => {
    setState({ ...state, volunteer: false });
  };
  const handleJoin = (type, regions = []) => {
    const data = {
      Campaign: {
        Id: state.id,
      },
      Regions: regions,
      EntityType: "Member",
      Type: type,
    };
    dispatch({ type: "REQUEST_START", payload: data });
    //['Owner', 'Member', 'Volunteer', 'Moderator', 'Item', 'Region']
  };
  const handleSubmit = () => {
    handleJoin(
      state.type,
      Object.keys(regions).map((key) => {
        return {
          RegionLevel: regions[key].RegionLevel,
          Region: {
            Id: regions[key][regions[key].RegionLevel].Id,
          },
        };
      })
    );
  };
  const openVolunteer = (item) => {
    setState({ ...state, id: item.Id, volunteer: true });
  };
  const buttonsWithActions = [{ label: 'details', action: handleClick }];
  return (
    <div className="page-right">
      {state.volunteer ? (
        <Modal closeModal={closeVolunteer}>
          <FormHolder>
            <div>
              <div className="input-holder">
                <RegionSelector
                  isCampaignRegion
                  campaignId={state.id}
                />
                <button
                  className="btn btn-success"
                  onClick={(event) => handleSubmit()}
                >
                  Save
                </button>
              </div>
            </div>
          </FormHolder>
        </Modal>
      ) : null}
      <TitleWithAction>
        {campaignModal ? (
          <Modal closeModal={closeModal}>
            <CampaignAdder />
          </Modal>
        ) : null}
        <h2>Campaigns / Clusters</h2>

      </TitleWithAction>

      <Search
        type="campaign"
        showFilter={true}
        handleSearch={handleSearch}
      />
      <GridToList
        handleClick={handleClick}
        type="CAMPAIGN"
        data={data}
        buttonsWithActions={buttonsWithActions}
      />
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
  const { campaign } = state;
  const { region } = state;
  return {
    regions: region.regions,
    pageFilters: campaign.selectedFilters ? campaign.selectedFilters : [],
    data: Object.keys(campaign.campaigns).map((key) => {
      return {
        ...campaign.campaigns[key],
        title: campaign.campaigns[key].Name,
      };
    }),
    form: campaign.form,
    campaignModal: campaign.form.campaignModal,
    activePage: campaign.activePage ? campaign.activePage : 0,
    totalItemsCount: campaign.totalItemsCount
      ? campaign.totalItemsCount
      : 0,
    itemsCountPerPage: campaign.itemsCountPerPage
      ? campaign.itemsCountPerPage
      : 0,
    pageRangeDisplayed: campaign.pageRangeDisplayed
      ? campaign.pageRangeDisplayed
      : 0,
  };
};
export default connect(mapState)(CAMPAIGNanzation);
