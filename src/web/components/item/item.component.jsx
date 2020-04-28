import React, { useState } from 'react';
import SortableTree from '../tree/index';
import { connect } from 'react-redux';
import ItemAdder from './item.adder';
const ItemContainer = ({ data, dispatch }) => {
  const changeOrder = (treeData, moved) => {
    if (moved) {
      dispatch({ type: 'ITEM_ORDER_CHANGED', payload: treeData });
    }
    setState({ treeData })
  }
  const [state, setState] = useState({ treeData: data });
  return (
    <div className='page-right'>
      <ItemAdder />
      <SortableTree
        treeData={state.treeData}
        onChange={(treeData, moved) => changeOrder(treeData, moved)}
      />
    </div>
  )
}
const mapState = (state) => {
  const { item } = state;
  return {
    data: item.items.map(item => {
      return { ...item, title: item.Name }
    })
  }
}
export default connect(mapState)(ItemContainer);