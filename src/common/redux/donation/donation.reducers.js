import { donationTypes } from './donation.types';
import { addItemToCart } from './donation.actions';
import {selectUser} from '../user/user.selectors';
const toaster = require('../../../web/components/toaster/index');

const INITIAL_STATE = {
  sider: false,
  cartItems: {},
  donations: {},
  replies: {},
  status: {},
  selectedFilters: {},
  PrefferedCollectionTime:new Date(),
  AddressLatLong:''
};

const donation = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case 'CHECK_USER_SESSION':
      return{
        ...state,
        'AddressLatLong':action.payload.latitude + ',' + action.payload.longitude,
      }
    case 'CHANGE_DONATION_DETAILS':
      return{
        ...state,
        [action.payload.name]:action.payload.value
      }
    case 'SET_DONATION_FILTERS':
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
      if (action.payload.clearAllExceptCat) {
        state.selectedFilters = {};
      }
      return {
        ...state,
        selectedFilters: {
          ...state.selectedFilters,
          [action.payload.from]: [...current],
        },
      }
    case 'FETCH_DONATION_REQUEST_THREAD_SUCCESS':
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
    case 'ADD_DONATION_SUCCESS':
      toaster.success("Notification Message", "Your request has been successfully submited.", { timeOut: 500000 })
      return{
        ...state,
        cartItems:{}
      }
    case 'FETCH_DONATION_DETAILS_SUCCESS':
      return {
        ...state,
        donations: {
          ...state.donations,
          [action.payload.DonationRequestOrganization.Id]: {
            ...state.donations[action.payload.DonationRequestOrganization.Id],
            ...action.payload
          }
        }
      }
    case 'FETCH_DONATION_REQUEST_SUCCESS':
      return {
        ...state,
        totalItemsCount: parseInt(action.payload.totalItemsCount),
        activePage: action.payload.activePage,
        itemsCountPerPage: action.payload.itemsCountPerPage,
        pageRangeDisplayed: action.payload.pageRangeDisplayed,
        donations: action.payload.result.reduce((obj, item) => {
          obj[item.DonationRequestOrganization.Id] = item
          return obj
        }, {})
      }
    case donationTypes.QUANTITY_CHANGED:
      return {
        ...state,
        cartItems: {
          ...state.cartItems,
          [action.payload.Id]: action.payload
        },
      }
    case donationTypes.UNIT_CHANGED:
      return {
        ...state,
        cartItems: {
          ...state.cartItems,
          [action.payload.Id]: action.payload
        },
      }
    case donationTypes.ADD_DONATION_ITEM:
      return {
        ...state,
        cartItems: {
          ...state.cartItems,
          [action.payload.Id]: state.cartItems[action.payload.Id] ? {
            ...state.cartItems[action.payload.Id],
            quantity: state.cartItems[action.payload.Id].quantity + 1
          } : { ...action.payload, quantity: 1 }
        },
      }
    case donationTypes.REMOVE_DONATION_ITEM:
      const filtered = state.cartItems;
      delete filtered[action.payload.Id];
      return {
        ...state,
        cartItems: {
          ...filtered
        }
      }
    case donationTypes.FETCH_ORG_DETAIL_SUCCESS:
      return {
        ...state,
        cartItems: {}
      }
    default:
      return state;
  }
}
export default donation;