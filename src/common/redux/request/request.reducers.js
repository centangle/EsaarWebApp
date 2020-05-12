import { requestTypes } from './request.types';

const INITIAL_STATE = {
  sider: false,
  requests: [],
  replies: {},
  status: {},
  selectedFilters:{}
};

const request = (state = INITIAL_STATE, action) => {
  switch (action.type) {
        case 'SET_REQUEST_FILTERS':
      let current = state.selectedFilters[action.payload.from]
        ? state.selectedFilters[action.payload.from]
        : [];
      if (action.payload.clearOld) {
        current = [];
      }
      if (!action.payload.checked) {
        if (!current.find(i => action.payload.item.Id === i.Id))
          current.push(action.payload.item);
      } else {
        current.splice(current.indexOf(action.payload.item), 1);
      }
      if(action.payload.clearAllExceptCat){
        state.selectedFilters={};
      }
      return {
        ...state,
        selectedFilters: {
          ...state.selectedFilters,
          [action.payload.from]: [...current],
        },
      }
    case 'FETCH_REQUEST_THREAD_SUCCESS':
      return {
        ...state,
        replies: {
          ...state.replies,
          [action.payload.Id]: action.payload.result
        }
      }
    case 'FETCH_REQUEST_STATUS_SUCCESS':
      return {
        ...state,
        status: action.payload.result.reduce((obj, item) => {
          obj[item] = item
          return obj
        }, {})
      }
    case 'FETCH_REQUEST_SUCCESS':
      return {
        ...state,
        totalItemsCount: parseInt(action.payload.totalItemsCount),
        activePage: action.payload.activePage,
        itemsCountPerPage: action.payload.itemsCountPerPage,
        pageRangeDisplayed: action.payload.pageRangeDisplayed,
        requests: action.payload.result.reduce((obj, item) => {
          obj[item.Id] = item
          return obj
        }, {})
      }
    case 'ASSIGN_REQUEST_SUCCESS':
      return{
        ...state,
        requests:{
          ...state.requests,
          [action.payload.result.requestId]:{
            ...state.requests[action.payload.result.requestId],
            IsOpenRequest:false
          }
        },
      }
    case requestTypes.ADD_REQUEST_START:
      return {
        ...state
      }
    default:
      return state;
  }
}
export default request;