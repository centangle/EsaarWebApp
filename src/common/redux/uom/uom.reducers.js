import { uomTypes } from './uom.types';

const INITIAL_STATE = {
  sider: false,
  uoms: [],
  periferalUoms: [],
  modal: false,
  uomLoading: false
};
let newUoms = [];
const uom = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case 'OPEN_MODAL':
      return {
        ...state,
        modal: true
      }
    case 'FETCH_UOM_START':
      return {
        ...state,
        uomLoading: true
      }
    case 'CLOSE_MODAL':
      return {
        ...state,
        modal: false
      }
    case 'FETCH_UOM_SUCCESS':
      return {
        ...state,
        uoms: [...action.payload.result],
        uomLoading:false
      }

    case 'FETCH_PERIFERAL_UOMS_SUCCESS':
      return {
        ...state,
        periferalUoms: [...action.payload.result]
      }
    case uomTypes.ADD_UOM_START:
      return {
        ...state
      }
    default:
      return state;
  }
}
export default uom;