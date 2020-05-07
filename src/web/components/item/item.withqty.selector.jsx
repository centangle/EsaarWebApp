import React, {useState, useEffect} from "react";
import Dropdown from "../dropdown/dropdown.component";
import {connect} from "react-redux";
import {ItemWithQtyHolder} from "./item.styles";
import UomInput from "../uom/uom.overview";
import ItemInput from "../item/item.input";
import "./item.styles.scss";
const ItemWithQtySelector = ({
  dispatch,
  items,
  handleAdd,
  handleRemove,
  addedItems,
}) => {
  useEffect(() => {
    //dispatch({type:'FETCH_ORG_ITEMS_START'});
  }, [dispatch]);
  const [state, setState] = useState({
    selected: {content: "Select Item"},
    ItemQuantity: "",
    ItemUOM: "",
  });
  const onUomSelect = (item) => {
    setState({...state, ItemUOM: item});
  };
  const mappedItems = items.map((item) => {
    return {value: item.Item.Id, content: item.Item.Name};
  });
  const onItemSelect = (item) => {
    setState({...state, selected: item});
  };
  const handleChange = (e) => {
    setState({...state, ItemQuantity: e.target.value});
  };

  return (
    <>
      <ItemWithQtyHolder>
        <div className="item">
          <ItemInput onSelect={onItemSelect} />
          {/* <Dropdown
                    onChange={(item) => onItemSelect(item)} options={mappedItems}
                    buttonIndicator={true}
                    selectedOption={state.selected}
                    buttonIndicatorContent={state.selected.content}
                /> */}
        </div>
        <div className="unit">
          <UomInput onSelect={onUomSelect} />
        </div>
        <div className="qty">
          <input
            type="text"
            onChange={handleChange}
            name="Qty"
            placeholder="Quantity"
          />
        </div>
        <div className="action">
          <button
            className="btn"
            onClick={() =>
              handleAdd({
                Item: {...state.selected},
                ItemQuantity: state.ItemQuantity,
                ItemUOM: state.ItemUOM,
              })
            }
          >
            <i className="fa fa-plus"></i> Add
          </button>
        </div>
      </ItemWithQtyHolder>
      <div className="added-items">
        {Object.keys(addedItems).map((key) => {
          return (
            <div className="item" key={key}>
              {addedItems[key].ItemQuantity + " "}
              {addedItems[key].ItemUOM.Name + " "}
              {addedItems[key].Item.Name}
              <span
                className="remove"
                onClick={() => handleRemove(addedItems[key].Item)}
              >
                x
              </span>
            </div>
          );
        })}
      </div>
    </>
  );
};
const mapState = (state) => {
  const {organization} = state;
  return {
    items: organization.items,
  };
};
export default connect(mapState)(ItemWithQtySelector);
