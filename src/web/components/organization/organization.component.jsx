import React, { useState } from "react";
import { connect } from "react-redux";
import OrganizationAdder from "./organization.adder";
import GridToList from "../grid-to-list/grid-to-list.component";
import { useHistory } from "react-router-dom";
import Modal from "../modal/modal.component";
import { TitleWithAction, FormHolder } from "./organization.styles";
import Search from "../search/search.component";
import Pagination from "react-js-pagination";
import { params } from "../../../common/utility/request";
import RegionSelector from "../region/region.selector";
const Organzation = ({
  regions,
  data,
  dispatch,
  form,
  activePage,
  totalItemsCount,
  pageRangeDisplayed,
  itemsCountPerPage,
}) => {
  let history = useHistory();
  const [state, setState] = useState({ treeData: data, volunteer: false, id: 0 });
  const closeModal = () => {
    dispatch({ type: "CLOSE_MODAL", payload: "ORG" });
  };
  const handleAddOrg = () => {
    dispatch({ type: "OPEN_MODAL", payload: "ORG" });
  };
  const handleClick = (obj) => {
    dispatch({ type: "ORGANIZATION_SELECTED", payload: obj });
    history.push(history.location.pathname + "/" + obj.Id);
  };
  const handleSearch = (term, filters) => {
    dispatch({
      type: "FETCH_ORGANIZATION_START",
      params: { ...params, name: term,filters:[filters] },
    });
  };
  const handlePageChange = (page) => {
    dispatch({
      type: "FETCH_ORGANIZATION_START",
      payload: "",
      params: {
        activePage: page,
        totalItemsCount,
        pageRangeDisplayed,
        itemsCountPerPage,
      },
    });
  };
  const closeVolunteer = () => {
    setState({ ...state, volunteer: false });
  };
  const handleJoin = (type, regions = []) => {
    const data = {
      Organization: {
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
  const buttonsWithActions = [{ label: "volunteer", action: openVolunteer },{label:'details',action:handleClick}];
  return (
    <div className="page-right">
      {state.volunteer ? (
        <Modal closeModal={closeVolunteer}>
          <FormHolder>
            <div>
              <div className="input-holder">
                <RegionSelector
                  isOrganizationRegion
                  organizationId={state.id}
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
        {form.orgModal ? (
          <Modal closeModal={closeModal}>
            <OrganizationAdder />
          </Modal>
        ) : null}
        <h2>Organizations / Clusters</h2>
        <button onClick={handleAddOrg}>
          <i className="fa fa-plus"></i> Add Organization
        </button>
      </TitleWithAction>

      <Search
        type="organization"
        handleSearch={handleSearch}
      />
      <GridToList
        handleClick={handleClick}
        type="ORGANIZATION"
        data={state.treeData}
        links={["donate"]}
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
  const { organization } = state;
  const { region } = state;
  return {
    regions: region.regions,
    data: Object.keys(organization.organizations).map((key) => {
      return {
        ...organization.organizations[key],
        title: organization.organizations[key].Name,
      };
    }),
    form: organization.form,
    activePage: organization.activePage ? organization.activePage : 0,
    totalItemsCount: organization.totalItemsCount
      ? organization.totalItemsCount
      : 0,
    itemsCountPerPage: organization.itemsCountPerPage
      ? organization.itemsCountPerPage
      : 0,
    pageRangeDisplayed: organization.pageRangeDisplayed
      ? organization.pageRangeDisplayed
      : 0,
  };
};
export default connect(mapState)(Organzation);
