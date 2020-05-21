import React, { useState } from "react";
import "./search.styles.scss";
import RegionSelector from "../region/region.selector";
import Modal from "../modal/modal.component";
import { connect } from "react-redux";
import Select from "react-select";

const CampaignSearch = ({ handleCheck, regions, rootItems }) => {
  const initState = {
    searchType: "InMyRegion",
    ByRegion: "",
    InRadius: "",
    Radius: "",
    modal: false,
  };
  const [state, setState] = useState(initState);
  const handleChange = ({target}) => {
    let modal = false;
    if (target.value === "ByRegion") {
      modal = true;
    }
    if (target.value === 'All' || target.value === 'InMyRegion') {
      handleCheck({
        Id: target.value,
        Name: target.value,
      }, "Filter", 0, true, true
      );
    }
    if (target.name === 'ByMeOnly') {
      handleCheck({
        Id: target.name,
        Name: "true",
      }, target.name, 0, true, false
      );
    }
    setState({ ...state, [target.name]: target.value, modal });
  };
  const handleClose = () => {
    setState({ ...state, modal: false });
  };
  const handleFilter = () => {
    Object.keys(regions).forEach((key) => {
      handleCheck(
        {
          Id: regions[key][regions[key].RegionLevel].Id,
          Name: regions[key][regions[key].RegionLevel].Name,
          ...regions[key],
        },
        "ByRegion",
        0,
        false,
        true
      );
    });
    setState({ ...state, modal: false, ...initState });
  };
  const handleSubmit = (from) => {
    handleCheck(
      {
        Id: state.InRadius,
        Name: state.Radius + " " + state.InRadius,
        radius: parseFloat(state.Radius),
        radiusType: state.InRadius,
      },
      from,
      0,
      true,
      true
    );
  };
  const handleDrop = (item) => {
    handleCheck(
      {
        Id: parseInt(item.value),
        Name: item.label,
      },
      "Item",
      0,
      false,
      false
    );
  };
  const mappedOptions = rootItems.length
    ? rootItems.map((i) => {
      return { value: i.Id, label: i.Name };
    })
    : [];
  return (
    <div className="search-input-holder">
      <Select
        onChange={handleDrop}
        name="Item"
        className="dropdown"
        options={mappedOptions}
      />
      <div className="filters-input">
        <select
          value={state.searchType}
          onChange={handleChange}
          name="searchType"
        >
          <option value="InMyRegion">InMyRegion</option>
          <option value="InRadius">InRadius</option>
          <option value="ByRegion">ByRegion</option>
          <option value="All">All Campaigns</option>
        </select>
        {state.searchType === "InRadius" ? (
          <span>
            <select
              value={state.InRadius}
              onChange={handleChange}
              name="InRadius"
            >
              <option value="">Select Radius Type</option>
              <option value="Meters">Meters</option>
              <option value="Kilometers">Kilometers</option>
            </select>
            <input
              value={state.Radius}
              name="Radius"
              onChange={handleChange}
              type="number"
              placeholder="e.g. 10"
            />
            <button
              className="btn btn-light"
              onClick={() => handleSubmit("InRadius")}
            >
              Apply Filters
            </button>
          </span>
        ) : null}
      </div>
      {state.searchType === "ByRegion" && state.modal ? (
        <Modal closeModal={handleClose}>
          <RegionSelector />
          <button onClick={handleFilter}>Add Filter</button>
        </Modal>
      ) : null}
      <label>
        <input name="ByMeOnly" checked={state.MyItemsOnly} onChange={(event) => handleChange({ target: { name: event.target.name, value: event.target.checked } })} type='checkbox' />
        Owned by me
      </label>
    </div>
  );
};
const mapState = (state) => {
  const { region } = state;
  const { item } = state;
  return {
    regions: region.regions,
    rootItems: item.rootItems,
  };
};
export default connect(mapState)(CampaignSearch);
