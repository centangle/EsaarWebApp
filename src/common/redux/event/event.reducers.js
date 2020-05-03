import {eventTypes} from './event.types';

const INITIAL_STATE = {
  sider:false,
  events:[],
  periferalItems:[],
  modal:false,
  form:{}
};
let newItems = [];
const event = (state = INITIAL_STATE, action) => {
  switch (action.type) {
      case 'OPEN_MODAL':
        return{
          ...state,
          modal:true
        }
      case 'CLOSE_MODAL':
        return{
          ...state,
          modal:false
        }

      case 'FETCH_EVENT_SUCCESS':
        return {
          ...state,
          events:[...action.payload.result]
        }
      case eventTypes.ADD_EVENT_START:
        return {
          ...state
        }
      default:
      return state;
  }
}
export default event;