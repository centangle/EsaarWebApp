import React, {useState} from "react";
import "./search.styles.scss";
import Modal from "../modal/modal.component";
import filterIcon from "./../../../assets/filter.png";
import {connect} from "react-redux";
import OrganizationSearch from "./organization.search";
import RequestSearch from "./request.search";
import DonationSearch from "./request.search";
const Filters = ({type, selectedFilters, handleCheck}) => {
  const filters = {
    location: [
      {Id: "Lahore", Name: "Lahore"},
      {Id: "Islamabad", Name: "Islamabad"},
    ],
    categories: [
      {Id: "Education", Name: "Education"},
      {Id: "Health", Name: "Health"},
    ],
  };
  if (type === "organization") {
    return <OrganizationSearch handleCheck={handleCheck} />;
  }
  if (type === "request") {
    return <RequestSearch handleCheck={handleCheck} />;
  }
  if (type === "donation") {
    return <DonationSearch handleCheck={handleCheck} />;
  }
  return Object.keys(filters).map((f) => {
    return (
      <span key={f} className="filter-item">
        <div className="filter-name">{f.toUpperCase()}</div>
        <div className="filter-items">
          {filters[f].map((item) => {
            const checked =
              selectedFilters[f] && selectedFilters[f].includes(item) ? 1 : 0;
            return (
              <span className="i" key={item.Id}>
                <label>
                  <input
                    checked={checked}
                    onChange={() => handleCheck(item, f, checked)}
                    type="checkbox"
                  />
                  {item.Name}
                </label>
              </span>
            );
          })}
        </div>
      </span>
    );
  });
};
const Search = ({handleSearch, type, dispatch, filter, selectedFilters}) => {
  const [state, setState] = useState({
    term: "",
    filter: false,
    advance: false,
    selectedFilters: {},
  });
  const handleCheck = (
    item,
    from,
    checked,
    clearOld = false,
    clearAllExceptCat = false
  ) => {
    if (type === "organization") {
      dispatch({
        type: "SET_ORGANIZATION_FILTERS",
        payload: {item, from, checked, clearOld, clearAllExceptCat},
      });
    }
    if (type === "donation") {
      dispatch({
        type: "SET_DONATION_FILTERS",
        payload: {item, from, checked, clearOld, clearAllExceptCat},
      });
    }
    if (type === "request") {
      dispatch({
        type: "SET_REQUEST_FILTERS",
        payload: {item, from, checked, clearOld, clearAllExceptCat},
      });
    }
  };
  const toggleAdvance = () => {
    setState({...state, advance: !state.advance});
  };
  const toggleFilter = () => {
    dispatch({type: "TOGGLE_FILTER", payload: {type}});
    //setState({ ...state, filter: !state.filter });
  };

  const handleChange = (event) => {
    setState({
      ...state,
      [event.target.name]: event.target.value,
    });
  };
  return (
    <div className="search-wrapper">
      <div className="filter-search">
        <div className="left">
          <div className="search-input">
            <input
              type="text"
              placeholder="Search"
              name="term"
              onChange={handleChange}
            />
            <button
              className="btn btn-primary"
              onClick={() => handleSearch(state.term, selectedFilters)}
            >
              <i className="fa fa-search"></i>
            </button>
          </div>
        </div>
        <div className="right">
          <span className="filter" onClick={toggleFilter}>
            <img src={filterIcon} alt="filter" /> <span>Filter</span>
          </span>
        </div>
      </div>
      {/* <div className="adv">
        {state.advance ? (
          <Modal closeModal={toggleAdvance}>
            <h1>Advanced Search</h1>
          </Modal>
        ) : null}
        <span onClick={toggleAdvance}>Advanced Search</span>
      </div> */}
      <div className="selected-filters">
        {Object.keys(selectedFilters).map((sf) => {
          return (
            <span key={sf} className="selected-item">
              {selectedFilters[sf].map((s) => {
                return (
                  <span className="item" key={s.Id}>
                    <b className="capitalize">{sf}</b>:{s.Name}
                    <span
                      className="action"
                      onClick={() => handleCheck(s, sf, 1)}
                    >
                      <i className="fa fa-close"></i>
                    </span>
                  </span>
                );
              })}
            </span>
          );
        })}
        &nbsp;
      </div>
      <div className="filters">
        {filter ? (
          <Filters
            key="filter"
            selectedFilters={selectedFilters}
            handleCheck={handleCheck}
            type={type}
          />
        ) : null}
      </div>
    </div>
  );
};
const mapState = (state, ownProps) => {
  const {type} = ownProps;
  const {setting, organization, donation, request} = state;
  let selectedFilters = organization.selectedFilters;
  if (type === "doantion") {
    selectedFilters = donation.selectedFilters;
  }
  if (type === "request") {
    selectedFilters = request.selectedFilters;
  }
  return {
    filter: setting.filter,
    selectedFilters,
  };
};
export default connect(mapState)(Search);
