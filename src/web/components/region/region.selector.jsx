import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import "./region.selector.styles.scss";
import Select from "react-select";
const RegionSelector = ({
  organizationId,
  isOrganizationRegion,
  levels,
  countries,
  states,
  districts,
  tehsils,
  ucs,
  dispatch,
  regions,
  currentRegions,
}) => {
  const [state, setState] = useState({
    isInit: "TRUE",
    RegionLevel: { ...levels[Object.keys(levels)[0]] },
    Country: { Id: "", Name: "" },
    State: { Id: "", Name: "" },
    District: { Id: "", Name: "" },
    Tehsil: { Id: "", Name: "" },
    UnionCouncil: { Id: "", Name: "" },
    saveable: false,
  });
  useEffect(() => {
    switch (state.isInit) {
      case "TRUE":
        dispatch({
          type: "FETCH_REGION_LEVELS_START",
          payload: { organizationId, isOrganizationRegion },
        });
        dispatch({
          type: "FETCH_COUNTRIES_START",
          payload: { isOrganizationRegion: false },
        });
        setState({ ...state, isInit: "FALSE" });
        return;
      default:
        return;
    }
  }, [dispatch, isOrganizationRegion, organizationId, state]);
  useEffect(() => {
    setState({ ...state, RegionLevel: { ...levels[Object.keys(levels)[0]] } });
  }, [levels]);
  const handleChange = (name, item) => {
    if (name === "Country") {
      setState({ ...state, [name]: item });
      dispatch({
        type: "FETCH_STATES_START",
        payload: {
          countryId: item.Id,
          isOrganizationRegion,
          organizationId,
        },
      });
    } else if (name === "State") {
      setState({
        ...state,
        District: { Id: "", Name: "" },
        Tehsil: { Id: "", Name: "" },
        UnionCouncil: { Id: "", Name: "" },
        [name]: item,
      });
      dispatch({
        type: "FETCH_DISTRICTS_START",
        payload: {
          stateId: item.Id,
          isOrganizationRegion,
          organizationId,
        },
      });
    } else if (name === "District") {
      setState({
        ...state,
        Tehsil: { Id: "", Name: "" },
        UnionCouncil: { Id: "", Name: "" },
        [name]: item,
      });
      dispatch({
        type: "FETCH_TEHSILS_START",
        payload: {
          districtId: item.Id,
          isOrganizationRegion,
          organizationId,
        },
      });
    } else if (name === "Tehsil") {
      setState({
        ...state,
        UnionCouncil: { Id: "", Name: "" },
        [name]: item,
      });
      dispatch({
        type: "FETCH_UCS_START",
        payload: {
          tehsilId: item.Id,
          isOrganizationRegion,
          organizationId,
        },
      });
    } else {
      setState({ ...state, [name]: item });
    }
  };
  const handleSubmit = (event) => {
    dispatch({
      type: "ADD_REGION",
      payload: { ...state, RegionLevel: state.RegionLevel.Name },
    });
  };
  const handleRemove = (key) => {
    dispatch({ type: "REMOVE_REGION", payload: key });
  };
  const onSelect = (name, item) => {
    handleChange(name, item);
  };
  const mappedLevels = Object.keys(levels).map((key) => {
    return { value: key, label: levels[key].Name };
  });
  const mappedCountries = Object.keys(countries).map((key) => {
    return { value: key, label: countries[key].Name };
  });
  const mappedStates = Object.keys(states).map((key) => {
    return { value: key, label: states[key].Name };
  });
  const mappedDistricts = Object.keys(districts).map((key) => {
    return { value: key, label: districts[key].Name };
  });
  const mappedTehsils = Object.keys(tehsils).map((key) => {
    return { value: key, label: tehsils[key].Name };
  });
  const mappedUcs = Object.keys(ucs).map((key) => {
    return { value: key, label: ucs[key].Name };
  });
  return (
    <>
      <div className="region-selector">
        <Select
          className="dropdown"
          defaultValue={state.RegionLevel.Id}
          onChange={(item) => onSelect("RegionLevel", levels[item.value])}
          placeholder="Select Level"
          options={mappedLevels}
        />
        <Select
          className="dropdown"
          defaultValue={state.Country.Id}
          onChange={(item) => onSelect("Country", countries[item.value])}
          placeholder="Select Country"
          options={mappedCountries}
        />
        {state.RegionLevel.Id > 0 ? (
          <Select
            className="dropdown"
            defaultValue={state.State.Id}
            onChange={(item) => onSelect("State", states[item.value])}
            placeholder="Select State"
            options={mappedStates}
          />
        ) : null}
        {state.RegionLevel.Id > 1 ? (
          <Select
            className="dropdown"
            defaultValue={state.District.Id}
            onChange={(item) => onSelect("District", districts[item.value])}
            placeholder="Select District"
            options={mappedDistricts}
          />
        ) : null}
        {state.RegionLevel.Id > 2 ? (
          <Select
            className="dropdown"
            defaultValue={state.Tehsil.Id}
            onChange={(item) => onSelect("Tehsil", tehsils[item.value])}
            placeholder="Select Tehsil"
            options={mappedTehsils}
          />
        ) : null}
        {state.RegionLevel.Id > 3 ? (
          <Select
            className="dropdown"
            defaultValue={state.UnionCouncil.Id}
            onChange={(item) => onSelect("UnionCouncil", ucs[item.value])}
            placeholder="Select Union Council"
            options={mappedUcs}
          />
        ) : null}
        <button onClick={handleSubmit} className="add-btn btn btn-primary">
          <i className="fa fa-map-pin"></i> Add Location
        </button>
      </div>
      <div className="item-holder">
        <table>
          <thead>
            <tr>
              <th>Level</th>
              <th>Country</th>
              <th>State/Province</th>
              <th>District</th>
              <th>Tehsil</th>
              <th>Union Council</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {Object.keys(regions).map((key) => {
              return (
                <tr key={key}>
                  <td>{regions[key].RegionLevel}</td>
                  <td>{regions[key].Country.Name}</td>
                  <td>{regions[key].State.Name}</td>
                  <td>{regions[key].District.Name}</td>
                  <td>{regions[key].Tehsil.Name}</td>
                  <td>{regions[key].UnionCouncil.Name}</td>
                  <td>
                    <button
                      className="btn btn-transparent margin-auto"
                      onClick={() => handleRemove(key)}
                    >
                      <i className="fa fa-remove"></i>
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
};
const mapState = (state) => {
  const { region } = state;
  return {
    levels: region.levels,
    countries: region.countries,
    states: region.states,
    districts: region.districts,
    tehsils: region.tehsils,
    ucs: region.ucs,
    regions: region.regions,
  };
};
export default connect(mapState)(RegionSelector);
