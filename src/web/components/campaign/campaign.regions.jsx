import React, {useState, useEffect} from "react";
import {connect} from "react-redux";
import {useHistory} from "react-router-dom";
import DataTable from "../table/DataTable/DataTable";
import {TitleWithAction, FormHolder} from "./campaign.styles";
import Modal from "../modal/modal.component";
import RegionSelector from "../region/region.selector";

import {fetchUomStart} from "../../../common/redux/uom/uom.actions";
import Pagination from "react-js-pagination";

const CampaignRegions = ({
  regions,
  campaigns,
  dispatch,
  campaign,
  fetchUomStart,
  form,
  newRegions,
  activePage,
  totalItemsCount,
  pageRangeDisplayed,
  itemsCountPerPage,
}) => {
  useEffect(() => {
    fetchUomStart();
  }, [fetchUomStart]);
  const [state, setState] = useState({
    addedItems: {},
    modal: false,
    Name: "",
    NativeName: "",
    Description: "",
  });
  let history = useHistory();

  const mappedData = regions.map((request) => {
    return {
      RegionLevel: request.RegionLevel,
      Country: request.Country.Name,
      State: request.State.Name,
      District: request.District.Name,
      Tehsil: request.Tehsil.Name,
      Uc: request.UnionCouncil.Name,
    };
  });

  const columns = [
    {
      name: "Level",
      selector: "RegionLevel",
      sortable: true,
    },
    {
      name: "Country",
      selector: "Country",
      sortable: true,
    },
    {
      name: "State / Provice",
      selector: "State",
      sortable: true,
    },
    {
      name: "District",
      selector: "District",
      sortable: true,
    },
    {
      name: "Tehsil",
      selector: "Tehsil",
      sortable: true,
    },
    {
      name: "Union Council",
      selector: "Uc",
      sortable: true,
    },
  ];
  const closeModal = () => {
    dispatch({type: "UNLOAD_CAMPAIGN_REGIONS"});
    dispatch({type: "CLOSE_MODAL", payload: "CAMPAIGN_REGION"});
  };
  const openModal = () => {
    dispatch({type: "OPEN_MODAL", payload: "CAMPAIGN_REGION"});
    dispatch({type: "LOAD_CAMPAIGN_REGIONS", payload: regions});
  };
  const handleChange = (event) => {
    setState({...state, [event.target.name]: event.target.value});
  };
  const handleSubmit = () => {
    const form = {...state};
    delete form["modal"];
    delete form["addedItems"];

    dispatch({
      type: "ADD_CAMPAIGN_REGION_START",
      payload: {
        regions: newRegions,
        campaignId: campaign.Id,
      },
    });
  };

  const {Name, NativeName, Description, ImageUrl, ImageInBase64} = state;
  const handlePageChange = (page) => {
    dispatch({
      type: "FETCH_CAMPAIGN_REGIONS_START",
      payload: campaign.Id,
      params: {
        activePage: page,
        totalItemsCount,
        pageRangeDisplayed,
        itemsCountPerPage,
      },
    });
  };
  return (
    <>
      <TitleWithAction>
        <h2>{campaign ? campaign.Name : null} Regions</h2>
        <button onClick={openModal}>Add/Edit a region</button>
      </TitleWithAction>
      <div className="modal-holder">
        {form.regionModal ? (
          <Modal closeModal={closeModal}>
            <h2>Add Campaign Regions</h2>
            <FormHolder>
              <div>
                <div className="input-holder">
                  <RegionSelector />
                  <button className="btn btn-success" onClick={handleSubmit}>
                    Save Regions
                  </button>
                </div>
              </div>
            </FormHolder>
          </Modal>
        ) : null}
      </div>
      <div className="table">
        <DataTable noHeader columns={columns} data={mappedData} />
        <Pagination
          activePage={activePage}
          itemsCountPerPage={itemsCountPerPage}
          totalItemsCount={totalItemsCount}
          pageRangeDisplayed={pageRangeDisplayed}
          onChange={handlePageChange.bind(this)}
        />
      </div>
    </>
  );
};
const mapState = (state) => {
  const {campaign} = state;
  const {region} = state;
  return {
    regions: campaign.regions,
    campaigns: campaign.campaigns,
    campaign: campaign.current,
    newRegions: Object.keys(region.regions).map((key) => {
      return {
        Id: region.regions[key].Id,
        RegionLevel: region.regions[key].RegionLevel,
        Region: {
          ...region.regions[key][region.regions[key].RegionLevel],
        },
      };
    }),
    form: campaign.form,
    activePage:
      campaign && campaign.activePage ? campaign.activePage : 0,
    totalItemsCount:
      campaign && campaign.totalItemsCount
        ? campaign.totalItemsCount
        : 0,
    itemsCountPerPage:
      campaign && campaign.itemsCountPerPage
        ? campaign.itemsCountPerPage
        : 0,
    pageRangeDisplayed:
      campaign && campaign.pageRangeDisplayed
        ? campaign.pageRangeDisplayed
        : 0,
  };
};
const mapDispatch = (dispatch) => ({
  fetchUomStart: () => dispatch(fetchUomStart()),
});
export default connect(mapState, mapDispatch)(CampaignRegions);
