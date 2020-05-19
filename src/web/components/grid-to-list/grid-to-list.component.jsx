import React from "react";
import "./grid-to-list.styles.scss";
import {ItemHolder, GridHolder, ListHolder} from "./grid-to-list.styles";
import {connect} from "react-redux";
import {Link} from "react-router-dom";
import noImage from "../../../assets/no-image.png";
const baseUrl = require("../../../common/utility/request").baseUrl;
const isFunction = (functionToCheck) => {
 return functionToCheck && {}.toString.call(functionToCheck) === '[object Function]';
}
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
          <ItemHolder height={height} className={`grid ${data[key].added}`} key={data[key].Id}>
            {
              buttonsWithActions || links ? <div className='overlay'></div>:null
            }
            <div className="grid-links">
              {buttonsWithActions &&
                buttonsWithActions.map((item) => {
                  let label = item.label;
                  if(isFunction(item.label)){
                    label = item.label(data[key]);
                  }
                  return (
                    <span
                      className="link testl"
                      key={item.Id+'-'+data[key].Id}
                      onClick={() => item.action(data[key])}
                    >
                      {label}
                    </span>
                  );
                })}
              {links &&
                links.map((link) => {
                  return (
                    <Link
                      key={link}
                      className="link"
                      to={`/${type.toLowerCase()}s/${data[key].Id}/${link}`}
                    >
                      {link}
                    </Link>
                  );
                })}
            </div>
            <div className="left">
              {data[key].ImageUrl ? (
                <img alt="logo" src={baseUrl + "/" + data[key].ImageUrl} />
              ) : (
                <img alt="logo" src={noImage} />
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
