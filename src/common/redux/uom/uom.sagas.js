import { takeLatest, all, call,put,select,takeEvery } from 'redux-saga/effects';
import { uomTypes } from './uom.types';
import { selectCurrentUser } from "../user/user.selectors";
import {addUomSuccess,addUomFailure,fetchUomSuccess,fetchUomDetailSuccess,fetchPeriferalUomSuccess} from './uom.actions';
import { apiLink } from '../api.links';
const url = apiLink;
export function* fetchUomAsync() {
  const currentUser = yield select(selectCurrentUser);
  const response = yield fetch(url + "/api/UOM/Get", {
    method: "GET",
    withCredentials: true,
    credentials: 'include',
    headers: { "Content-Type": "application/json", 'Authorization': 'bearer '+currentUser.access_token },
  }).then(async (response) => {
    const result = await response.json();
    if (response.status >= 205) {
      return { result, error: true };
    }
    return {ok:true,result:result.Items};
  });
  if (response.ok) {
    yield put(fetchUomSuccess(response));
  }
}
export function* fetchPeriferalUomAsync(){
    const currentUser = yield select(selectCurrentUser);
  const response = yield fetch(url + "/api/Uom/GetPeripheralUoms", {
    method: "GET",
    withCredentials: true,
    credentials: 'include',
    headers: { "Content-Type": "application/json", 'Authorization': 'bearer '+currentUser.access_token },
  }).then(async (response) => {
    const result = await response.json();
    if (response.status >= 205) {
      return { result, error: true };
    }
    return {ok:true,result};
  });
  if (response.ok) {
    yield put(fetchPeriferalUomSuccess(response));
  }
}
export function* fetchUomDetailAsync(action) {
  const currentUser = yield select(selectCurrentUser);
  const response = yield fetch(url + "/api/Uom/Get"+action.payload.id, {
    method: "GET",
    withCredentials: true,
    credentials: 'include',
    headers: { "Content-Type": "application/json", 'Authorization': 'bearer '+currentUser.access_token },
  }).then(async (response) => {
    const result = await response.json();
    if (response.status >= 205) {
      return { result, error: true };
    }
    return {ok:true,result};
  });
  if (response.ok) {
    yield put(fetchUomDetailSuccess(response));
  }
}
export function* addUomAsync(action) {
    try {
        const currentUser = yield select(selectCurrentUser);
        const uom = yield fetch(url + "/api/UOM/Create", {
            method: 'POST',
            withCredentials: true,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'bearer '+currentUser.access_token
            },
            body: JSON.stringify(action.payload)
        }).then(async (response) => {
            if (response.status >= 205) {
                const result = await response.json();
                return { result, error: true };
            }
            return response.json();
        });
        if (uom.error) {
            yield put(addUomFailure(uom));
        } else {
            yield put(addUomSuccess({ uom }));
        }
    } catch (error) {
        yield put(addUomFailure(error));
    }
}
export function* updateUomAsync(action) {
    try {
        const currentUser = yield select(selectCurrentUser);
        const uom = yield fetch(url + "/api/UOM/UpdateMultipleUOMsWithChildrens", {
            method: 'PUT',
            withCredentials: true,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'bearer '+currentUser.access_token
            },
            body: JSON.stringify(action.payload)
        }).then(async (response) => {
            if (response.status >= 205) {
                const result = await response.json();
                return { result, error: true };
            }
            return response.json();
        });
        if (uom.error) {
            yield put(addUomFailure(uom));
        } else {
            yield put(addUomSuccess({ uom }));
        }
    } catch (error) {
        yield put(addUomFailure(error));
    }
}
export function* addUomStart() {
    yield takeEvery(uomTypes.ADD_UOM_START, addUomAsync)
}
export function* changeOrder(){
    yield takeEvery(uomTypes.UOM_ORDER_CHANGED,updateUomAsync )
}
export function* fetchUom() {
  yield takeLatest(uomTypes.FETCH_UOM_START, fetchUomAsync);
}
export function* fetchUomDetail(){
    yield takeLatest(uomTypes.FETCH_UOM_DETAIL, fetchUomDetailAsync);
}
export function* fetchPeriferalUom(){
    yield takeLatest(uomTypes.FETCH_PERIFERAL_UOMS_START, fetchPeriferalUomAsync);
}
export function* uomSagas() {
    yield all([
        call(addUomStart),
        call(changeOrder),
        call(fetchUom),
        call(fetchPeriferalUom),
        call(fetchUomDetail)
    ]);
}