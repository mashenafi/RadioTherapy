// src/state/WatchLoadData.tsx


import { takeEvery, put, call } from 'redux-saga/effects';
import { PayloadAction } from '@reduxjs/toolkit';
import { getPlansDataFailure, getPlansDataSuccess, getPlansData} from './state/DataLoadingState';
import { startPlanPosting, serverUpdateResult, startPlanRemoving, startPlanUpdating } from './state/DataPostingState';
import {dataFrame} from './state/DataLoadingState';
import {formDataFrame} from './state/AppState';


let SERVER_PATH = "http://127.0.0.1/api/";

// FETCH DATA
function* loadDataSaga(): Generator<any, void, any>{
  // Saga to handle data loading from server
    try {
        //start fetching data from server
        const requestPath = SERVER_PATH;
        let response = yield call(() => fetch(requestPath));
        if (response.status === 200){
          const data = yield response.json();
          // Dispatch success action with the received data
          yield put(getPlansDataSuccess(data));
        }else{
          yield put(getPlansDataFailure());
        }

    } catch (error) {
        // Dispatch failure action on error
        yield put(getPlansDataFailure());
        console.error('Error fetching data:', error);
    }
  }
  
export function* watchLoadData() {
      // Watch for the getSongsFetch action and trigger saga
    yield takeEvery(getPlansData, loadDataSaga);
  }

// POST DATA
function* postData(action: PayloadAction<formDataFrame>):Generator<any, void, any> {
  try {
    const response = yield call(fetch, SERVER_PATH, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ plans: action.payload }),
    });
    if (response.status === 200){
      yield put(serverUpdateResult("Your treatment plan has been successfully added to database."));
      yield put(getPlansData());
    }else{
      yield put(serverUpdateResult("Please make sure you fill out all the fields before you submit. If the problem persists, please contact developer."));
    }
  } catch (error) {
    console.error('Error while posting data:', error);
    yield put(serverUpdateResult("We were unable to add your plan to database. Please try again later. If the problem persists, please contact developer."));
  }
}

export function* watchPostData() {
  yield takeEvery(startPlanPosting, postData);
}

// DELETE DATA
function* deleteData(action: PayloadAction<string>):Generator<any, void, any> {
  try {
    const response = yield call(fetch, SERVER_PATH, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id: action.payload }),
    });
    if(response.status === 200){
      yield put(serverUpdateResult("Your treatment plan has been successfully deleted from database."));
      yield put(getPlansData());
    }else{
      yield put(serverUpdateResult("We were unable to delete selected plan from database. Please try again later. If the problem persists, please contact developer."));
    }
  } catch (error) {
    console.error('Error while deleting data:', error);
    yield put(serverUpdateResult("We were unable to delete selected plan from database. Please try again later. If the problem persists, please contact developer."));
  }
}
export function* watchDeleteData() {
  yield takeEvery(startPlanRemoving, deleteData);
}

// PUT DATA
function* updateData(action: PayloadAction<dataFrame>):Generator<any, void, any> {

  try {
    const response = yield call(fetch, SERVER_PATH, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(action.payload),
    });
    if (response.status === 200){
      yield put(serverUpdateResult("Your plan has been successfully updated."));
      yield put(getPlansData());
    }else{
      yield put(serverUpdateResult("Sorry, we were unable to update your plan in database. Please try again later. If the problem persists, contact developer."));
    }
  } catch (error) {
    console.error('Error while updating data:', error);
    yield put(serverUpdateResult("Sorry, we were unable to update your plan in database. Please try again later. If the problem persists, contact developer."));
  }
}
export function* watchUpdateData() {
  yield takeEvery(startPlanUpdating, updateData);
}
