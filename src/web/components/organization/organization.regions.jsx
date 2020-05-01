import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { useHistory } from "react-router-dom";
import DataTable from '../table/DataTable/DataTable';
import { TitleWithAction, FormHolder } from './organization.styles';
import Modal from '../modal/modal.component';
import RegionSelector from '../region/region.selector';

import { fetchUomStart } from '../../../common/redux/uom/uom.actions';

const OrganizationRegions = ({ regions, organizations, dispatch, organization, fetchUomStart,form,newRegions }) => {
  useEffect(() => {
    fetchUomStart();
  }, [fetchUomStart]);
  const [state, setState] = useState({
    addedItems: {},
    modal: false, Name: '', NativeName: '', Description: ''
  });
  let history = useHistory();

  const mappedData = regions.map(request => {
    return {
      RegionLevel:request.RegionLevel,
      Country: request.Country.Name,
      State: request.State.Name,
      District: request.District.Name,
      Tehsil: request.Tehsil.Name,
      Uc: request.UnionCouncil.Name
    }
  });

  const columns = [
    {
      name: 'Level',
      selector: 'RegionLevel',
      sortable: true,
    },
    {
      name: 'Country',
      selector: 'Country',
      sortable: true,
    },
    {
      name: 'State / Provice',
      selector: 'State',
      sortable: true,
    },
    {
      name: 'District',
      selector: 'District',
      sortable: true,
    },
    {
      name: 'Tehsil',
      selector: 'Tehsil',
      sortable: true,
    },
    {
      name: 'Union Council',
      selector: 'Uc',
      sortable: true,
    }
  ];
  const closeModal = () => {
    dispatch({type:'UNLOAD_ORG_REGIONS'});
    dispatch({ type: 'CLOSE_MODAL', payload: 'ORG' });
  }
  const openModal = () => {
    dispatch({ type: 'OPEN_MODAL', payload: 'ORG' });
    dispatch({type:'LOAD_ORG_REGIONS',payload:regions});
  }
  const handleChange = (event) => {
    setState({ ...state, [event.target.name]: event.target.value })
  }
  const handleSubmit = () => {
    const form = { ...state };
    delete form['modal'];
    delete form['addedItems'];

    dispatch({
      type: 'ADD_ORG_REGION_START', payload: {
        regions:newRegions,
        organizationId:organization.Id
      }
    })
  }

  const { Name, NativeName, Description, ImageUrl, ImageInBase64 } = state;

  return (
    <>
      <TitleWithAction>
        <h2>{organization ? organization.Name : null} Regions</h2>
        <button onClick={openModal}>Add/Edit a region</button>
      </TitleWithAction>
      <div className='btn'>
        {form.modal ? <Modal closeModal={closeModal}>
          <h2>Add Organization Regions</h2>
          <FormHolder>
            <div>
              <div className='input-holder'>
                  <RegionSelector  />
                <button onClick={handleSubmit}>Save Regions</button>
              </div>
            </div>
          </FormHolder>
        </Modal> : null}
      </div>
      <div className='table'>
        <DataTable
          noHeader
          columns={columns}
          data={mappedData}
        />
      </div>
    </>
  )
}
const mapState = (state) => {
  const { organization } = state;
  const {region} = state;
  return {
    regions: organization.regions,
    organizations: organization.organizations,
    organization: organization.current,
    newRegions:Object.keys(region.regions).map(key=>{
      return {
        Id:region.regions[key].Id,
        RegionLevel:region.regions[key].RegionLevel,
        Region:{
          ...region.regions[key][region.regions[key].RegionLevel]
        }
      }
    }),
    form:organization.form
  }
}
const mapDispatch = dispatch => ({
  fetchUomStart: () => dispatch(fetchUomStart()),
})
export default connect(mapState, mapDispatch)(OrganizationRegions);