import React, { useState } from 'react';
import SortableTree from '../tree/index';
import { connect } from 'react-redux';
import ItemAdder from './item.adder';
import Modal from '../modal/modal.component';
const ItemContainer = ({ data, dispatch, modal }) => {
  const changeOrder = (treeData, moved) => {
    if (moved) {
      dispatch({ type: 'ITEM_ORDER_CHANGED', payload: treeData });
    }
    setState({ treeData })
  }
  const [state, setState] = useState({ treeData: data });
  const openModal = (node) => {
    dispatch({type:'FETCH_UOM_START',payload:true});
    dispatch({ type: 'OPEN_MODAL', payload: { item: node, type: 'ITEM' } });
  }
  const closeModal = () => {
    dispatch({ type: 'CLOSE_MODAL' });
  }
  const handleRemove = (item) => {
    dispatch({ type: 'REMOVE_ITEM_START', payload: item.Id });
  }
  const renderButton = (node) => {
    return <span>
      <button onClick={() => openModal(node)} className='view-btn'>Edit</button>
      <button onClick={() => handleRemove(node)} className='view-btn'>Remove</button>
    </span>
  }
  return (
    <div className='page-right'>
      {modal ? <Modal closeModal={closeModal}>
        <ItemAdder />
      </Modal> : null
      }
      <button onClick={() => openModal(null)}>Add New</button>
      <SortableTree
        treeData={state.treeData}
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
  const { item } = state;
  return {
    data: item.items.map(item => {
      return { ...item, title: item.Name }
    }),
    modal: item.modal
  }
}
export default connect(mapState)(ItemContainer);