import React from 'react';
import {ItemHolder,ListHolder} from './grid-to-list.styles';
import { connect } from 'react-redux';
import CustomButton from '../custom-button/custom-button.component';
const baseUrl = require('../../../common/utility/request').baseUrl;

const Tabular = ({data,dispatch,type}) =>{
    return (
        <ListHolder>
           {
              Object.keys(data).map(key=>{
                   return(
                       <ItemHolder className='data list' key={data[key].Id}>
                           <div className='left'>
                               {data[key].ImageUrl?<img alt='logo' src={baseUrl+'/'+data[key].ImageUrl}/>:'icon'}
                           </div>
                           <div className='right'>
                               <div>
                                   <h2>{data[key].Name}</h2>
                                   <span>{data[key].Description}</span>
                               </div>
                           </div>
                           <div className='action'>
                               {
                                   data[key].actions && data[key].actions.map(action=>{
                                       return(
                                           action.visible?<CustomButton key={action.id} loading={action.loading} handleClick={()=>action.handleClick(action.item)}>
                                               {action.title}
                                            </CustomButton>:null
                                       )
                                   })
                               }
                           </div>
                        </ItemHolder>
                   )
               })
           }
        </ListHolder>
    )
}
export default connect()(Tabular);