import { takeLatest, all, call,put,select,takeEvery } from 'redux-saga/effects';
import { eventTypes } from './event.types';
import { selectCurrentUser } from "../user/user.selectors";
import {addEventSuccess,addEventFailure,fetchEventSuccess,fetchEventDetailSuccess} from './event.actions';
import { apiLink } from '../api.links';
const url = apiLink;
export function* fetchEventAsync() {
  const currentUser = yield select(selectCurrentUser);
  const response = yield fetch(url + "/api/Event/GetAllEvents?dataStructure=Tree", {
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
    yield put(fetchEventSuccess(response));
  }
}

export function* fetchEventDetailAsync(action) {
  const currentUser = yield select(selectCurrentUser);
  const response = yield fetch(url + "/api/Event/Get"+action.payload.id, {
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
    yield put(fetchEventDetailSuccess(response));
  }
}
export function* addEventAsync(action) {
    try {
        const currentUser = yield select(selectCurrentUser);
        const event = yield fetch(url + "/api/Event/Create", {
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
        if (event.error) {
            yield put(addEventFailure(event));
        } else {
            yield put(addEventSuccess({ event }));
        }
    } catch (error) {
        yield put(addEventFailure(error));
    }
}
export function* updateEventAsync(action) {
    try {
        const currentUser = yield select(selectCurrentUser);
        const event = yield fetch(url + "/api/Event/UpdateMultipleEventsWithChildrens", {
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
        if (event.error) {
            yield put(addEventFailure(event));
        } else {
            yield put(addEventSuccess({ event }));
        }
    } catch (error) {
        yield put(addEventFailure(error));
    }
}
export function* addEventStart() {
    yield takeEvery(eventTypes.ADD_EVENT_START, addEventAsync)
}

export function* fetchEvent() {
  yield takeLatest(eventTypes.FETCH_EVENT_START, fetchEventAsync);
}
export function* fetchEventDetail(){
    yield takeLatest(eventTypes.FETCH_EVENT_DETAIL, fetchEventDetailAsync);
}

export function* eventSagas() {
    yield all([
        call(addEventStart),
        call(fetchEvent),
        call(fetchEventDetail)
    ]);
}