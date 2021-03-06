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
import Tour from "reactour";
const Organzation = ({
  regions,
  data,
  dispatch,
  form,
  activePage,
  totalItemsCount,
  pageRangeDisplayed,
  itemsCountPerPage,
  pageFilters,
}) => {
  let history = useHistory();
  const [state, setState] = useState({
    treeData: data,
    volunteer: false,
    id: 0,
    tour: false,
  });
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
      params: { ...params, name: term, filters: [filters] },
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
        filters: [pageFilters],
      },
    });
  };
  const closeVolunteer = () => {
    dispatch({ type: "CLOSE_MODAL" });
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
    dispatch({ type: "OPEN_MODAL", payload: "VOLUNTEER" });
    setState({ ...state, id: item.Id, volunteer: true });
  };
  const buttonsWithActions = [
    { Id: "1", label: "volunteer", action: openVolunteer },
    { Id: "2", label: "details", action: handleClick },
  ];
  const closeTour = () => {
    setState({ ...state, tour: false });
  };
  const openTour = () => {
    setState({ ...state, tour: true });
  };
  const stepSetup = (step) => {
    //alert(step);
    setState({ ...state, tour: false });
    dispatch({ type: "TOGGLE_FILTER", payload: { type: "organization" } });
    //alert(step);
  };
  const steps = [
    {
      selector: ".link-profile",
      content:
        "This is your profile dashboard link. From anywhere you can move to your dashboard using this.",
    },
    {
      selector: ".link-home",
      content: "Link for home page.",
    },
    {
      selector: ".link-orgs",
      content:
        "Search Organizations link. You can search organizations by a number of filters",
    },
    {
      selector: ".btn-org-add",
      content:
        "Add your organization from here. Please make sure that you don't register organization that you don't represent.",
    },
    {
      selector: ".search-input",
      content: "You can search organization here",
    },
    {
      selector: ".filter",
      content: "Filter from here",
    },
    {
      selector: ".selected-filters",
      content:
        "These are the applied filter for your search. You can add new filters or remove that are added.",
    },
    {
      select: ".all",
      content: "something",
      action: stepSetup,
    },
    // ...
  ];

  return (
    <div className="page-right">
      {form.volunteerModal ? (
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
        <button onClick={openTour}>Open Tour</button>
        <Tour
          steps={steps}
          isOpen={state.tour}
          startAt={0}
          onRequestClose={closeTour}
        />
        <button className="btn-org-add" onClick={handleAddOrg}>
          <i className="fa fa-plus"></i> Add Organization
        </button>
      </TitleWithAction>

      <Search
        type="organization"
        className="search"
        showFilter={true}
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
    pageFilters: organization.selectedFilters
      ? organization.selectedFilters
      : [],
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
