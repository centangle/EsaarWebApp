import React, { useState } from 'react';
import SortableTree from '../tree/index';
import { connect } from 'react-redux';
import UomAdder from './uom.adder';
const UomList = ({ data, dispatch }) => {
    const changeOrder = (treeData, moved) => {
    if (moved) {
      dispatch({ type: 'UOM_ORDER_CHANGED', payload: treeData });
    }
    setState({ treeData })
  }
  const [state, setState] = useState({ treeData: data });
  return (
    <div className='page-right'>
      <UomAdder />
      <SortableTree
        treeData={state.treeData}
        onChange={(treeData, moved) => changeOrder(treeData, moved)}
      />
    </div>
  )
}
const mapState = (state) => {
  const { uom } = state;
  return {
    data: uom.uoms.map(uom => {
      return { ...uom, title: uom.Name }
    })
  }
}
export default connect(mapState)(UomList);