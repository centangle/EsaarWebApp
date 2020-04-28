import React from 'react';
import './grid-to-list.styles.scss';
import {ItemHolder,GridHolder,ListHolder} from './grid-to-list.styles';
import { connect } from 'react-redux';
const baseUrl = require('../../../common/utility/request').baseUrl;

const GridToList = ({data,dispatch,type,handleClick,height}) =>{

    return (
        <GridHolder>
           {
              Object.keys(data).map(key=>{
                   return(
                       <ItemHolder height={height} onClick={()=>handleClick(data[key])} className='grid' key={data[key].Id}>
                           <div className='left'>
                               {data[key].ImageUrl?<img alt='logo' src={baseUrl+'/'+data[key].ImageUrl}/>:'icon'}
                           </div>
                           <div className='right'>
                               <div>
                                   <h2>{data[key].Name}</h2>
                               </div>
                           </div>
                        </ItemHolder>
                   )
               })
           }
        </GridHolder>
    )
}
export default connect()(GridToList);