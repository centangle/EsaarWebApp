import React,{useState} from 'react';
import { connect } from 'react-redux';
import {TitleWithAction} from './event.styles';
import Modal from '../modal/modal.component';
import { useHistory } from "react-router-dom";
import EventAdder from './event.adder';
import GridToList from '../grid-to-list/grid-to-list.component';
const Event = ({ data, dispatch,form }) =>{
    let history = useHistory();
    const [state, setState] = useState({ treeData: data });
    const closeModal = () => {
        dispatch({type:'CLOSE_MODAL',payload:'ORG'});
    }
    const handleAddOrg = () =>{
        dispatch({type:'OPEN_MODAL',payload:'ORG'});
    }
    const handleClick = (obj) => {
        dispatch({ type: 'EVENT_SELECTED', payload: obj });
        history.push(history.location.pathname + '/' + obj.Id);
    }
    return(
        <div className='page-right'>
            <TitleWithAction>
                {
                form.modal ? <Modal closeModal={closeModal}>
                    <EventAdder />
                </Modal> : null
                }
                <h2>Events</h2>
                <button onClick={handleAddOrg}>Add Events</button>
            </TitleWithAction>

            <GridToList handleClick={handleClick} type='EVENT' data={state.treeData} />
        </div>
    )
}
const mapState = (state) => {
  const { event } = state;
  return {
    data: Object.keys(event.events).map(key => {
      return { ...event.events[key], title: event.events[key].Name }
    }),
    form:event.form
  }
}
export default connect(mapState)(Event);