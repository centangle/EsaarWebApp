import React, {useState, useEffect} from "react";
import {connect} from "react-redux";
import "./region.selector.styles.scss";
import organization from "../../../common/redux/organization/organization.reducers";
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
    RegionLevel: {...levels[Object.keys(levels)[0]]},
    Country: {Id: "", Name: ""},
    State: {Id: "", Name: ""},
    District: {Id: "", Name: ""},
    Tehsil: {Id: "", Name: ""},
    UnionCouncil: {Id: "", Name: ""},
    saveable: false,
  });
  useEffect(() => {
    switch (state.isInit) {
      case "TRUE":
        dispatch({
          type: "FETCH_REGION_LEVELS_START",
          payload: {organizationId, isOrganizationRegion},
        });
        dispatch({
          type: "FETCH_COUNTRIES_START",
          payload: {isOrganizationRegion: false},
        });
        setState({...state, isInit: "FALSE"});
        return;
      default:
        return;
    }
  }, [dispatch, isOrganizationRegion, organizationId, state]);
  useEffect(() => {
    setState({...state, RegionLevel: {...levels[Object.keys(levels)[0]]}});
  }, [levels]);
  const handleChange = (event, item) => {
    if (event.target.name === "Country") {
      setState({...state, [event.target.name]: item});
      dispatch({
        type: "FETCH_STATES_START",
        payload: {
          countryId: event.target.value,
          isOrganizationRegion,
          organizationId,
        },
      });
    } else if (event.target.name === "State") {
      setState({
        ...state,
        District: {Id: "", Name: ""},
        Tehsil: {Id: "", Name: ""},
        UnionCouncil: {Id: "", Name: ""},
        [event.target.name]: item,
      });
      dispatch({
        type: "FETCH_DISTRICTS_START",
        payload: {
          stateId: event.target.value,
          isOrganizationRegion,
          organizationId,
        },
      });
    } else if (event.target.name === "District") {
      setState({
        ...state,
        Tehsil: {Id: "", Name: ""},
        UnionCouncil: {Id: "", Name: ""},
        [event.target.name]: item,
      });
      dispatch({
        type: "FETCH_TEHSILS_START",
        payload: {
          districtId: event.target.value,
          isOrganizationRegion,
          organizationId,
        },
      });
    } else if (event.target.name === "Tehsil") {
      setState({
        ...state,
        UnionCouncil: {Id: "", Name: ""},
        [event.target.name]: item,
      });
      dispatch({
        type: "FETCH_UCS_START",
        payload: {
          tehsilId: event.target.value,
          isOrganizationRegion,
          organizationId,
        },
      });
    } else {
      setState({...state, [event.target.name]: item});
    }
  };
  const handleSubmit = (event) => {
    dispatch({
      type: "ADD_REGION",
      payload: {...state, RegionLevel: state.RegionLevel.Name},
    });
  };
  const handleRemove = (key) => {
    dispatch({type: "REMOVE_REGION", payload: key});
  };
  return (
    <>
      <div className="region-selector">
        <select
          value={state.RegionLevel.Id}
          name="RegionLevel"
          onChange={(event) => handleChange(event, levels[event.target.value])}
          placeholder="select regions"
        >
          <option value="" disabled>
            Select Region RegionLevel
          </option>
          {Object.keys(levels).map((key) => {
            return (
              <option value={key} key={key}>
                {levels[key].Name}
              </option>
            );
          })}
        </select>
        <select
          value={state.Country.Id}
          name="Country"
          onChange={(event) =>
            handleChange(event, countries[event.target.value])
          }
          placeholder="select Country"
        >
          <option value="" disabled>
            Select Country
          </option>
          {Object.keys(countries).map((key) => {
            return (
              <option value={countries[key].Id} key={countries[key].Id}>
                {countries[key].Name}
              </option>
            );
          })}
        </select>
        {state.RegionLevel.Id > 0 ? (
          <select
            value={state.State.Id}
            name="State"
            onChange={(event) =>
              handleChange(event, states[event.target.value])
            }
            placeholder="select State"
          >
            <option value="" disabled>
              Select State
            </option>
            {Object.keys(states).map((key) => {
              return (
                <option value={states[key].Id} key={states[key].Id}>
                  {states[key].Name}
                </option>
              );
            })}
          </select>
        ) : null}
        {state.RegionLevel.Id > 1 ? (
          <select
            value={state.District.Id}
            name="District"
            onChange={(event) =>
              handleChange(event, districts[event.target.value])
            }
            placeholder="select District"
          >
            <option value="" disabled>
              Select District
            </option>
            {Object.keys(districts).map((key) => {
              return (
                <option value={districts[key].Id} key={districts[key].Id}>
                  {districts[key].Name}
                </option>
              );
            })}
          </select>
        ) : null}
        {state.RegionLevel.Id > 2 ? (
          <select
            value={state.Tehsil.Id}
            name="Tehsil"
            onChange={(event) =>
              handleChange(event, tehsils[event.target.value])
            }
            placeholder="select Tehsil"
          >
            <option value="" disabled>
              Select Tehsil
            </option>
            {Object.keys(tehsils).map((key) => {
              return (
                <option value={tehsils[key].Id} key={tehsils[key].Id}>
                  {tehsils[key].Name}
                </option>
              );
            })}
          </select>
        ) : null}
        {state.RegionLevel.Id > 3 ? (
          <select
            value={state.UnionCouncil.Id}
            name="UnionCouncil"
            onChange={(event) => handleChange(event, ucs[event.target.value])}
            placeholder="select Union Council"
          >
            <option value="" disabled>
              Select Union Council
            </option>
            {Object.keys(ucs).map((key) => {
              return (
                <option value={ucs[key].Id} key={ucs[key].Id}>
                  {ucs[key].Name}
                </option>
              );
            })}
          </select>
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
  const {region} = state;
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
