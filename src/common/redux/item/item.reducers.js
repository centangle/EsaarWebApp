import {itemTypes} from './item.types';

const INITIAL_STATE = {
  sider:false,
  items:[],
  periferalItems:[]
};
let newItems = [];
const item = (state = INITIAL_STATE, action) => {
  switch (action.type) {
      case 'FETCH_ITEM_SUCCESS':
        return {
          ...state,
          items:[...action.payload.result]
        }
      case 'FETCH_DONATION_ITEMS_SUCCESS':
        return{
          ...state,
          items:[...action.payload.result]
        }
      case 'DONATION_UOM_CHANGED':
        newItems = [];
        state.items && state.items.forEach((item, index)=>{
          if(item && item.Id===action.payload.item.Id){
            item.ApprovedQuantityUOM = {Id:parseInt(action.payload.ApprovedQuantityUOM)}
          }
          newItems.push(item);
        });
        return{
          ...state,
          items:[...newItems]
        }
      case 'DONATION_QUANTITY_CHANGED':
        newItems = [];
        state.items && state.items.forEach((item, index)=>{
          if(item && item.Id===action.payload.item.Id){
            item.ApprovedQuantity = action.payload.ApprovedQuantity
          }
          newItems.push(item);
        })
        return{
          ...state,
          items:[...newItems]
        }
      case 'FETCH_PERIFERAL_ITEMS_SUCCESS':
        return{
          ...state,
          periferalItems:[...action.payload.result]
        }
      case itemTypes.ADD_ITEM_START:
        return {
          ...state
        }
      default:
      return state;
  }
}
export default item;