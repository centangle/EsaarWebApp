import React, { useState } from 'react';
import './search.styles.scss';
import Modal from '../modal/modal.component';

const Search = ({ filters,handleSearch }) => {
    const [state, setState] = useState({ term:'',filter: false, advance: false,selectedFilters:{} })
    const toggleAdvance = () => {
        setState({ ...state, advance: !state.advance })
    }
    const toggleFilter = () => {
        setState({ ...state, filter: !state.filter })
    }
    const handleCheck = (item,from,checked) =>{
        let current = state.selectedFilters[from]?state.selectedFilters[from]:[];
        if(!checked){
            current.push(item);
        }else{
            current.splice( current.indexOf(item), 1 );
        }
        setState({
            ...state,
            selectedFilters:{
                ...state.selectedFilters,
                [from]:[...current]
            }
        });
    }
    const handleChange = (event) =>{
        setState({
            ...state,
            [event.target.name]:event.target.value
        })
    }
    const Filters = () =>{
        return(
            Object.keys(filters).map(f=>{
                return(
                    <span key={f} className='filter-item'>
                        <div className='filter-name'>
                            {f.toUpperCase()}
                        </div>
                        <div className='filter-items'>
                            {
                                filters[f].map(item=>{
                                    const checked = state.selectedFilters[f] && state.selectedFilters[f].includes(item)?1:0;
                                    return(
                                        <span className='i' key={item}>
                                            <label><input checked={checked} onChange={()=>handleCheck(item,f,checked)} type='checkbox' />{item}</label>
                                        </span>
                                    )
                                })
                            }
                        </div>
                    </span>
                )
            })
        )
    }
    return (
        <div className='search-wrapper'>
            <div className='filter-search'>
                <div className='left'>
                    <div className='search-input'>
                        <input type='text' placeholder='search' name='term' onChange={handleChange} />
                        <button onClick={()=>handleSearch(state.term,state.selectedFilters)}>Search</button>
                    </div>
                </div>
                <div className='right'>
                    <span className='filter' onClick={toggleFilter}>Filter</span>
                </div>
            </div>
            <div className='adv'>
                {
                    state.advance ? <Modal closeModal={toggleAdvance}>
                        <h1>Advanced Search</h1>
                    </Modal> : null
                }
                <span onClick={toggleAdvance}>Advanced Search</span>
            </div>
            <div className='selected-filters'>
                {
                    Object.keys(state.selectedFilters).map(sf=>{
                        return(
                            <span key={sf} className='selected-item'>
                                {
                                    state.selectedFilters[sf].map(s=>{
                                        return(
                                            <span className='item' key={s}>
                                                {sf}:{s}
                                                <span className='action' onClick={()=>handleCheck(s,sf,1)}>X</span>
                                            </span>
                                        )
                                    })
                                }
                            </span>
                        )
                    })
                }
                &nbsp;
            </div>
            <div className='filters'>
                {state.filter ? <Filters /> : null}
            </div>
        </div>

    )
}
export default Search;