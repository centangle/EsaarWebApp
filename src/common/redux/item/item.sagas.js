import { takeLatest, all, call,put,select,takeEvery } from 'redux-saga/effects';
import { itemTypes } from './item.types';
import { selectCurrentUser } from "../user/user.selectors";
import {
  fetchItemStart,
  addItemSuccess,addItemFailure,
  fetchItemSuccess,fetchItemDetailSuccess,
  fetchPeriferalItemSuccess} from './item.actions';
import { apiLink } from '../api.links';
const url = apiLink;
export function* fetchItemAsync() {
  const currentUser = yield select(selectCurrentUser);
  const response = yield fetch(url + "/api/Item/GetAllItems?dataStructure=Tree", {
    method: "GET",
    //withCredentials: true,
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
    yield put(fetchItemSuccess(response));
  }
}
export function* fetchPeriferalItemAsync(){
    const currentUser = yield select(selectCurrentUser);
  const response = yield fetch(url + "/api/Item/GetPeripheralItems", {
    method: "GET",
    //withCredentials: true,
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
    yield put(fetchPeriferalItemSuccess(response));
  }
}
export function* fetchItemDetailAsync(action) {
  const currentUser = yield select(selectCurrentUser);
  const response = yield fetch(url + "/api/Item/Get"+action.payload.id, {
    method: "GET",
    //withCredentials: true,
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
    yield put(fetchItemDetailSuccess(response));
  }
}
export function* addItemAsync(action) {
    try {
        const currentUser = yield select(selectCurrentUser);
        const item = yield fetch(url + "/api/Item/Create", {
            method: 'POST',
            //withCredentials: true,
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
        if (item.error) {
            yield put(addItemFailure(item));
        } else {
            //yield put(addItemSuccess({ item }));
            yield put(fetchItemStart());
        }
    } catch (error) {
        yield put(addItemFailure(error));
    }
}
export function* updateItemAsync(action) {
    try {
        const currentUser = yield select(selectCurrentUser);
        const item = yield fetch(url + "/api/Item/Update", {
            method: 'PUT',
            //withCredentials: true,
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
        if (item.error) {
            yield put(addItemFailure(item));
        } else {
            //yield put(addItemSuccess({ item }));
            yield put(fetchItemStart());
        }
    } catch (error) {
        yield put(addItemFailure(error));
    }
}
export function* removeItemAsync(action) {
  const currentUser = yield select(selectCurrentUser);
  const response = yield fetch(url + "/api/Item/DeleteItemWithChildren/" + action.payload, {
    method: "DELETE",
    //withCredentials: true,
    credentials: 'include',
    headers: { "Content-Type": "application/json", 'Authorization': 'bearer ' + currentUser.access_token },
  }).then(async (response) => {
    const result = await response.json();
    if (response.status >= 205) {
      return { result, error: true };
    }
    return { ok: true, result: result, Id: action.payload };
  });
  if (response.ok) {
    yield put(fetchItemStart())
    //yield put(removeUomSuccess(response));
  }
}
export function* changeItemAsync(action) {
    try {
        const currentUser = yield select(selectCurrentUser);
        const item = yield fetch(url + "/api/Item/UpdateMultipleItemsWithChildrens", {
            method: 'PUT',
            //withCredentials: true,
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
        if (item.error) {
            yield put(addItemFailure(item));
            yield put(fetchItemStart());
        } else {
            yield put(addItemSuccess({ item }));
        }
    } catch (error) {
        yield put(addItemFailure(error));
        yield put(fetchItemStart());
    }
}
export function* addItemStart() {
    yield takeEvery(itemTypes.ADD_ITEM_START, addItemAsync)
}
export function* updateItemStart() {
    yield takeEvery(itemTypes.UPDATE_ITEM_START, updateItemAsync)
}
export function* changeOrder(){
    yield takeEvery(itemTypes.ITEM_ORDER_CHANGED,changeItemAsync )
}
export function* fetchItem() {
  yield takeLatest(itemTypes.FETCH_ITEM_START, fetchItemAsync);
}
export function* fetchItemDetail(){
    yield takeLatest(itemTypes.FETCH_ITEM_DETAIL, fetchItemDetailAsync);
}
export function* fetchPeriferalItem(){
    yield takeLatest(itemTypes.FETCH_PERIFERAL_ITEMS_START, fetchPeriferalItemAsync);
}
export function* removeItem() {
  yield takeLatest(itemTypes.REMOVE_ITEM_START, removeItemAsync);
}
export function* itemSagas() {
    yield all([
        call(addItemStart),
        call(updateItemStart),
        call(changeOrder),
        call(fetchItem),
        call(fetchPeriferalItem),
        call(fetchItemDetail),
        call(removeItem)
    ]);
}