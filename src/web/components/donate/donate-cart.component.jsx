import React, {useState} from "react";
import {connect} from "react-redux";
import {CartHolder} from "./donate.styles";
const DonateCart = ({items, dispatch, organization, match}) => {
  const [state, setState] = useState({note: "", uom: ""});
  const handleChange = (item, quantity) => {
    dispatch({
      type: "QUANTITY_CHANGED",
      payload: {...item, quantity: parseFloat(quantity)},
    });
  };
  const handleNote = (e) => {
    setState({...state, note: e.target.value});
  };
  const handleSubmit = () => {
    const mappedItems = items.map((item) => {
      return {
        Item: {...item},
        Quantity: item.quantity,
        QuantityUOM: state.uom ? state.uom : item.ItemUOMs[0],
      };
    });
    let type = "Donor";
    if (match.params.slug === "get-donation") {
      type = "Beneficiary";
    }
    dispatch({
      type: "ADD_DONATION_START",
      payload: {
        Items: mappedItems,
        Note: state.note,
        OrganizationId: organization.Id,
        Type: type,
      },
    });
  };
  const handleDrop = (e) => {
    setState({...state, uom: e.target.value});
  };
  const handleRemove = (item) => {
    dispatch({type: "REMOVE_DONATION_ITEM", payload: item});
  };
  return (
    <CartHolder>
      <div className="cih">
        <h2>Selected Items</h2>
        {items.map((item) => {
          return (
            <span className="cart-Item" key={item.Id}>
              <span>{item.Name}</span>
              <span>
                <input
                  className="form-field text-center"
                  name={`input${item.Id}`}
                  type="number"
                  value={item.quantity}
                  onChange={(e) => handleChange(item, e.target.value)}
                />
              </span>
              <span>
                <select
                  className="form-field select-field"
                  value={state.uom}
                  onChange={(e) => handleDrop(e)}
                >
                  {item.ItemUOMs.map((uom) => {
                    return (
                      <option key={uom.Id} value={uom.Id}>
                        {uom.Name}
                      </option>
                    );
                  })}
                </select>
              </span>
              <span>
                <button
                  className="btn btn-transparent"
                  onClick={() => handleRemove(item)}
                >
                  <i className="fa fa-close"></i>
                </button>
              </span>
            </span>
          );
        })}
      </div>
      <div className="action">
        <textarea
          className="form-field"
          onChange={handleNote}
          value={state.note}
          placeholder="Note"
        />
        <button className="btn btn-primary text-center" onClick={handleSubmit}>
          Donate
        </button>
      </div>
    </CartHolder>
  );
};
const mapState = (state) => {
  const {donation} = state;
  return {
    items: Object.keys(donation.cartItems).map(
      (key) => donation.cartItems[key]
    ),
  };
};
export default connect(mapState)(DonateCart);
