import { organizationTypes } from './organization.types';
const toaster = require('../../../web/components/toaster/index');

const INITIAL_STATE = {
  sider: false,
  organizations: [],
  requests: [],
  campaigns: [],
  categories: [],
  items: [],
  packages: [],
  current: {},
  offices: [],
  accounts: [],
  regions: [],
  campaignsLoading: false,
  itemsLoading: false,
  requestsLoading: false,
  packagesLoading: false,
  membersLoading: false,
  officesLoading: false,
  accountsLoading: false,
  attachmentsLoading: false,
  volunteerJoining: false,
  moderatorJoining: false,
  memberJoining: false,
  regionsLoading: false,
  logo: null,
  form: {},
  selectedFilters: { Item: [] }
};

const organization = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case 'SET_ORGANIZATION_FILTERS':
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
        state.selectedFilters = { Item: [...state.selectedFilters.Item] };
      }
      return {
        ...state,
        selectedFilters: {
          ...state.selectedFilters,
          [action.payload.from]: [...current],
        },
      }
    case 'FETCH_ORG_CAMPAIGNS_START':
      return {
        ...state,
        campaignsLoading: true
      }
    case 'UPLOAD_SUCCESS':
      return {
        ...state,
        logo: action.uploadType === 'Logo' ? action.meta : null
      }
    case 'ADD_ORG_ATTACHMENT_START':
    case 'ADD_ORG_OFFICE_START':
    case 'ADD_ORG_ACCOUNT_START':
    case 'ADD_ORG_CAMPAIGN_START':
    case 'ADD_ORG_ITEMS_START':
    case 'ADD_ORG_PACKAGE_START':
    case 'ADD_ORGANIZATION_START':
      return {
        ...state,
        form: { ...action.payload, modal: true }
      }
    case 'ADD_ORG_ATTACHMENT_SUCCESS':
    case 'ADD_ORG_OFFICE_SUCCESS':
    case 'ADD_ORG_ACCOUNT_SUCCESS':
    case 'ADD_ORG_CAMPAIGN_SUCCESS':
    case 'ADD_ORG_PACKAGE_SUCCESS':
    case 'ADD_ORGANIZATION_SUCCESS':
    case 'ADD_ORG_REGION_SUCCESS':
    case 'UPDATE_ORGANIZATION_SUCCESS':
      return {
        ...state,
        logo: null,
        form: { modal: false, ...action.payload },
      }
    case 'ADD_ORG_ATTACHMENT_FAILURE':
    case 'ADD_ORG_OFFICE_FAILURE':
    case 'ADD_ORG_ACCOUNT_FAILURE':
    case 'ADD_ORG_CAMPAIGN_FAILURE':
    case 'ADD_ORG_ITEMS_FAILURE':
    case 'ADD_ORG_PACKAGE_FAILURE':
    case 'ADD_ORGANIZATION_FAILURE':
      return {
        ...state,
        form: { ...state.form, error: action.payload, modal: true }
      }

    case 'FETCH_ORG_OFFICES_START':
      return {
        ...state,
        officesLoading: true
      }
    case 'FETCH_ORG_OFFICES_SUCCESS':
      return {
        ...state,
        totalItemsCount: parseInt(action.payload.totalItemsCount),
        activePage: action.payload.activePage,
        itemsCountPerPage: action.payload.itemsCountPerPage,
        pageRangeDisplayed: action.payload.pageRangeDisplayed,
        officesLoading: false,
        offices: action.payload.result
      }
    case 'FETCH_ORG_ACCOUNTS_START':
      return {
        ...state,
        accountsLoading: true
      }
    case 'FETCH_ORG_ACCOUNTS_SUCCESS':
      return {
        ...state,
        accountsLoading: false,
        accounts: action.payload.result,
        totalItemsCount: parseInt(action.payload.totalItemsCount),
        activePage: action.payload.activePage,
        itemsCountPerPage: action.payload.itemsCountPerPage,
        pageRangeDisplayed: action.payload.pageRangeDisplayed,
      }
    case 'FETCH_ORG_ATTACHMENTS_START':
      return {
        ...state,
        attachmentsLoading: true
      }
    case 'FETCH_ORG_ATTACHMENTS_SUCCESS':
      return {
        ...state,
        attachmentsLoading: false,
        attachments: action.payload.result,
        accounts: action.payload.result,
        totalItemsCount: parseInt(action.payload.totalItemsCount),
        activePage: action.payload.activePage,
        itemsCountPerPage: action.payload.itemsCountPerPage,
        pageRangeDisplayed: action.payload.pageRangeDisplayed,
      }
    case 'FETCH_ORG_CAMPAIGNS_SUCCESS':
      return {
        ...state,
        campaigns: action.payload.result,
        totalItemsCount: parseInt(action.payload.totalItemsCount),
        activePage: action.payload.activePage,
        itemsCountPerPage: action.payload.itemsCountPerPage,
        pageRangeDisplayed: action.payload.pageRangeDisplayed,
        campaignsLoading: false
      }
    case 'FETCH_ORG_REGIONS_START':
      return {
        ...state,
        regionsLoading: true
      }
    case 'FETCH_ORG_REGIONS_SUCCESS':
      return {
        ...state,
        regions: action.payload.result,
        totalItemsCount: parseInt(action.payload.totalItemsCount),
        activePage: action.payload.activePage,
        itemsCountPerPage: action.payload.itemsCountPerPage,
        pageRangeDisplayed: action.payload.pageRangeDisplayed,
        regionsLoading: false,
      }
    case 'REQUEST_START':
      return {
        ...state,
        volunteerJoining: action.payload.Type === "Volunteer",
        moderatorJoining: action.payload.Type === "Moderator",
        memberJoining: action.payload.Type === 'Member'
      }
    case 'REQUEST_SUCCESS':
    case 'REQUEST_FAILURE':
      if (action.payload.result && action.payload.result.ExceptionMessage)
        toaster.error("Notification Message", action.payload.result.ExceptionMessage, { timeOut: 50000 })
      //alert(action.payload.result.ExceptionMessage);
      return {
        ...state,
        volunteerJoining: false,
        moderatorJoining: false,
        memberJoining: false,
        form: { modal: false }
      }
    case 'FETCH_ORG_REQUESTS_START':
      return {
        ...state,
        requestsLoading: true
      }
    case 'FETCH_ORG_MEMBERS_START':
      return {
        ...state,
        membersLoading: true
      }
    case 'FETCH_ORG_ITEMS_START':
      return {
        ...state,
        itemsLoading: true
      }
    case 'FETCH_ORG_REQUESTS_SUCCESS':
      return {
        ...state,
        requestsLoading: false,
        requests: {
          items: action.payload.result,
          totalItemsCount: parseInt(action.payload.totalItemsCount),
          activePage: action.payload.activePage,
          itemsCountPerPage: action.payload.itemsCountPerPage,
          pageRangeDisplayed: action.payload.pageRangeDisplayed
        }
      }
    case 'FETCH_ORG_MEMBERS_SUCCESS':
      return {
        ...state,
        membersLoading: false,
        members: action.payload.result,
        totalItemsCount: parseInt(action.payload.totalItemsCount),
        activePage: action.payload.activePage,
        itemsCountPerPage: action.payload.itemsCountPerPage,
        pageRangeDisplayed: action.payload.pageRangeDisplayed,
      }
    case 'FETCH_ORG_ITEMS_SUCCESS':
      return {
        ...state,
        items: action.payload.result,
        totalItemsCount: parseInt(action.payload.totalItemsCount),
        activePage: action.payload.activePage,
        itemsCountPerPage: action.payload.itemsCountPerPage,
        pageRangeDisplayed: action.payload.pageRangeDisplayed,
        itemsLoading: false
      }
    case 'FETCH_ORG_PACKAGES_START':
      return {
        ...state,
        packagesLoading: true
      }
    case 'FETCH_ORG_PACKAGES_SUCCESS':
      return {
        ...state,
        packages: action.payload.result,
        totalItemsCount: parseInt(action.payload.totalItemsCount),
        activePage: action.payload.activePage,
        itemsCountPerPage: action.payload.itemsCountPerPage,
        pageRangeDisplayed: action.payload.pageRangeDisplayed,
        packagesLoading: false
      }
    case 'FETCH_ORG_PACKAGES_FAILURE':
      return {
        ...state,
        packagesLoading: false
      }
    case 'OPEN_MODAL':
      return {
        ...state,
        form: {
          ...state.form,
          modal: action.payload !== 'ORG' ? true : false,
          orgModal: action.payload === 'ORG' ? true : false,
        }
      }
    case 'CLOSE_MODAL':
      return {
        ...state,
        form: {
          ...state.form,
          modal: false,
          orgModal: false
        }
      }
    case 'FETCH_ORG_CATEGORIES_SUCCESS':
      return {
        ...state,
        categories: action.payload
      }
    case 'FETCH_ORGANIZATION_SUCCESS':
      return {
        ...state,
        form: {},
        totalItemsCount: parseInt(parseInt(action.payload.totalItemsCount)),
        activePage: action.payload.activePage,
        itemsCountPerPage: action.payload.itemsCountPerPage,
        pageRangeDisplayed: action.payload.pageRangeDisplayed,
        organizations: action.payload.result.reduce((obj, item) => {
          obj[item.Id] = item
          return obj
        }, {})
      }
    case 'ORGANIZATION_SELECTED':
      return {
        ...state,
        current: action.payload
      }
    case 'FETCH_ORG_DETAIL_SUCCESS':
      return {
        ...state,
        current: action.payload.result,
        organizations: {
          ...state.organizations,
          [action.payload.result.Id]: action.payload.result
        }
      }
    case 'ADD_ORG_ITEMS_SUCCESS':
      return {
        ...state,
        items: [...state.items, { ...action.payload.request, Id: action.payload.organization }]
      }
    case 'REMOVE_ORG_ITEMS_START':
      return {
        ...state,
      }
    case 'REMOVE_ORG_ITEMS_SUCCESS':
      return {
        ...state,
        items: state.items.filter(i => i.Item.Id !== action.payload.request.itemId)
      }
    case 'REMOVE_ORG_ITEMS_FAILURE':
      if (action.payload.organization && action.payload.organization.result.ExceptionMessage)
        toaster.error("Notification Message", action.payload.organization.result.ExceptionMessage, { timeOut: 50000 })
      return {
        ...state
      }
    default:
      return state;
  }
}
export default organization;