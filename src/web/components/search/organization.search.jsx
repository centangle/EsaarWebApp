import React, { useState } from 'react';
import './search.styles.scss';
import RegionSelector from '../region/region.selector';
import Modal from '../modal/modal.component';
import { connect } from 'react-redux';
const OrganizationSearch = ({ handleCheck, regions }) => {
    const initState = { searchType: 'OrganizationInMyRegion', OrganizationByRegion: '', OrganizationInRadius: '', Radius: '', modal: false };
    const [state, setState] = useState(initState)
    const handleChange = (event) => {
        let modal = false;
        if (event.target.value === 'OrganizationByRegion') {
            modal = true;
        }
        setState({ ...state, [event.target.name]: event.target.value, modal });
    }
    const handleClose = () => {
        setState({ ...state, modal: false })
    }
    const handleFilter = () => {
        Object.keys(regions).forEach(key => {
            handleCheck({ Id: regions[key][regions[key].RegionLevel].Id, Name: regions[key][regions[key].RegionLevel].Name, ...regions[key] }, 'OrganizationByRegion', 0, false,true);
        });
        setState({ ...state, modal: false, ...initState });
    }
    const handleSubmit = (from) => {
        handleCheck({
            Id: state.OrganizationInRadius,
            Name: state.Radius + ' ' + state.OrganizationInRadius,
            radius:parseFloat(state.Radius),
            radiusType:state.OrganizationInRadius
        }, from, 0, true,true);
    }
    return (
        <div>
            <div className='filters-input'>
            <select value={state.searchType} onChange={handleChange} name="searchType">
                <option value="OrganizationInMyRegion">OrganizationInMyRegion</option>
                <option value="OrganizationInRadius">OrganizationInRadius</option>
                <option value="OrganizationByRegion">OrganizationByRegion</option>
            </select>
            {
                state.searchType === 'OrganizationInRadius' ? <span>
                    <select value={state.OrganizationInRadius} onChange={handleChange} name="OrganizationInRadius">
                        <option value="">Select Radius Type</option>
                        <option value="Meters">Meters</option>
                        <option value="Kilometers">Kilometers</option>
                    </select>
                    <input value={state.Radius} name='Radius' onChange={handleChange} type="number" placeholder="e.g. 10" />
                    <button onClick={() => handleSubmit('OrganizationInRadius')}>Filter</button>
                </span> : null
            }
            </div>
            {
                state.searchType === 'OrganizationByRegion' && state.modal ? <Modal closeModal={handleClose}>
                    <RegionSelector />
                    <button onClick={handleFilter}>Add Filter</button>
                </Modal> : null
            }
        </div>
    )
}
const mapState = (state) => {
    const { region } = state;
    return {
        regions: region.regions
    }
};
export default connect(mapState)(OrganizationSearch);