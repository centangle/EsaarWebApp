import React, { useState } from 'react';
import { connect } from 'react-redux';
import { ItemHolder, ActionBar } from './item.styles';
const ItemSelector = ({ onSelect, onDeselect, selected, periferalItems }) => {
    const isSelected = (item) => {
        var i;
        for (i = 0; i < selected.length; i++) {
            if (selected[i].Id === item.Id) {
                return true;
            }
        }
        return false;
    }
    const handleSelect = (item) => {
        if (isSelected(item)) {
            onDeselect(item);
        } else {
            onSelect(item);
        }
    }
    return (
        <>
            <ItemHolder>
                {
                    periferalItems.map(item => {
                        return (
                            <div key={item.Id} className={`item ${isSelected(item) ? 'selected' : ''}`} onClick={() => handleSelect(item)}>
                                {item.Name}
                            </div>
                        )
                    })
                }
            </ItemHolder>
        </>

    )
}
const mapState = (state) => {
    const { periferalItems } = state.item;
    return {
        periferalItems
    }
}
export default connect(mapState)(ItemSelector);