import React, { useState } from 'react';
import SortableTree from '../tree/index';
import { connect } from 'react-redux';
import UomAdder from './uom.adder';
import Modal from '../modal/modal.component';
const UomList = ({ data, dispatch, modal }) => {
  const changeOrder = (treeData, moved) => {
    dispatch({ type: 'UOM_ORDER_CHANGED', payload: treeData });
    //setState({ treeData })
  }
  //const [state, setState] = useState({ treeData: data });
  const openModal = (node) => {
    dispatch({ type: 'OPEN_MODAL',payload:{item:node,type:'UOM'} });
  }
  const closeModal = (Id) => {
    dispatch({ type: 'CLOSE_MODAL' });
  }
  const handleRemove = (item) =>{
    dispatch({ type: 'REMOVE_UOM_START',payload:item.Id });
  }
  const renderButton = (node) => {
    return (
      <span>
        <button onClick={() => openModal(node)} className='view-btn'>Edit</button>
        <button onClick={() => handleRemove(node)} className='view-btn'>Remove</button>
      </span>
    )
  }
  return (
    <div className='page-right'>
      {modal ? <Modal closeModal={closeModal}>
        <UomAdder />
      </Modal> : null
      }
      <button onClick={()=>openModal(null)}>Add New</button>
      <SortableTree
        treeData={data}
        onChange={(treeData, moved) => changeOrder(treeData, moved)}
        generateNodeProps={({ node, path }) => ({
          title: (
            <span>
              {node.Name}
              {renderButton(node)}
            </span>
          ),
        })}
      />
    </div>
  )
}
const mapState = (state) => {
  const { uom } = state;
  return {
    data: uom.uoms.map(uom => {
      return { ...uom, title: uom.Name }
    }),
    modal: uom.modal
  }
}
export default connect(mapState)(UomList);