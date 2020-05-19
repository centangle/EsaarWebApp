import React, {useState} from "react";
import "./search.styles.scss";
import RegionSelector from "../region/region.selector";
import Modal from "../modal/modal.component";
import {connect} from "react-redux";
import Select from "react-select";
const CampaignSearch = ({handleCheck, regions, rootItems}) => {
  const initState = {
    searchType: "InMyRegion",
    CampaignByRegion: "",
    CampaignInRadius: "",
    Radius: "",
    modal: false,
  };
  const [state, setState] = useState(initState);
  const handleChange = (event) => {
    let modal = false;
    if (event.target.value === "CampaignByRegion") {
      modal = true;
    }
    setState({...state, [event.target.name]: event.target.value, modal});
  };
  const handleClose = () => {
    setState({...state, modal: false});
  };
  const handleFilter = () => {
    Object.keys(regions).forEach((key) => {
      handleCheck(
        {
          Id: regions[key][regions[key].RegionLevel].Id,
          Name: regions[key][regions[key].RegionLevel].Name,
          ...regions[key],
        },
        "CampaignByRegion",
        0,
        false,
        true
      );
    });
    setState({...state, modal: false, ...initState});
  };
  const handleSubmit = (from) => {
    handleCheck(
      {
        Id: state.CampaignInRadius,
        Name: state.Radius + " " + state.CampaignInRadius,
        radius: parseFloat(state.Radius),
        radiusType: state.CampaignInRadius,
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
        return {value: i.Id, label: i.Name};
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
          <option value="InMyRegion">CampaignInMyRegion</option>
          <option value="CampaignInRadius">CampaignInRadius</option>
          <option value="CampaignByRegion">CampaignByRegion</option>
        </select>
        {state.searchType === "CampaignInRadius" ? (
          <span>
            <select
              value={state.CampaignInRadius}
              onChange={handleChange}
              name="CampaignInRadius"
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
              onClick={() => handleSubmit("CampaignInRadius")}
            >
              Apply Filters
            </button>
          </span>
        ) : null}
      </div>
      {state.searchType === "CampaignByRegion" && state.modal ? (
        <Modal closeModal={handleClose}>
          <RegionSelector />
          <button onClick={handleFilter}>Add Filter</button>
        </Modal>
      ) : null}
    </div>
  );
};
const mapState = (state) => {
  const {region} = state;
  const {item} = state;
  return {
    regions: region.regions,
    rootItems: item.rootItems,
  };
};
export default connect(mapState)(CampaignSearch);
