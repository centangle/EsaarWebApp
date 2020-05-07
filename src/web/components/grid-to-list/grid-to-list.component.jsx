import React from "react";
import "./grid-to-list.styles.scss";
import {ItemHolder, GridHolder, ListHolder} from "./grid-to-list.styles";
import {connect} from "react-redux";
import {Link} from "react-router-dom";
const baseUrl = require("../../../common/utility/request").baseUrl;

const GridToList = ({
  data,
  dispatch,
  type,
  handleClick,
  height,
  links,
  buttonsWithActions,
}) => {
  return (
    <GridHolder>
      {Object.keys(data).map((key) => {
        return (
          <ItemHolder height={height} className="grid" key={data[key].Id}>
            {
              buttonsWithActions || links ? <div className='overlay'></div>:null
            }
            <div className="grid-links">
              {buttonsWithActions &&
                buttonsWithActions.map((item) => {
                  return (
                    <span
                      className="link testl"
                      key={item.label}
                      onClick={() => item.action(data[key])}
                    >
                      {item.label}
                    </span>
                  );
                })}
              {links &&
                links.map((link) => {
                  return (
                    <Link
                      key={link}
                      className="link"
                      to={`/organizations/${data[key].Id}/${link}`}
                    >
                      {link}
                    </Link>
                  );
                })}
              {links && (
                <span className="link" onClick={() => handleClick(data[key])}>
                  Details
                </span>
              )}
            </div>
            <div className="left">
              {data[key].ImageUrl ? (
                <img alt="logo" src={baseUrl + "/" + data[key].ImageUrl} />
              ) : (
                "icon"
              )}
            </div>
            <div className="right">
              <div className="name">
                <h2>{data[key].Name}</h2>
              </div>
            </div>
            
          </ItemHolder>
        );
      })}
    </GridHolder>
  );
};
export default connect()(GridToList);
