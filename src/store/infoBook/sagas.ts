import InfoBookService from "../../services/InfoBookService";
import {AxiosResponse} from "axios";
import InfoItemResponse from "../../interfaces/responses/infoBooks/InfoItemResponse";
import {call, put, takeEvery, all, fork} from 'redux-saga/effects'
import {fetchInfoBook, fetchInfoBooksError, fetchInfoBooksSuccess} from "./actions";
import {FETCH_INFO_BOOKS, InfoBooksActionsTypes} from "./types";


function * asyncBooksList(params: InfoBooksActionsTypes) {
    try{
        const booksList: AxiosResponse<InfoItemResponse[]> = yield call(InfoBookService.fetchAll)
        if(booksList.data){
            yield put(fetchInfoBooksSuccess(booksList.data))
        }else{
            yield put(fetchInfoBooksError())
        }
    }catch (e) {
        yield put(fetchInfoBooksError())
    }
}

function* watchAsync() {
    yield takeEvery(FETCH_INFO_BOOKS, asyncBooksList)
}

export function* infoBookSaga() {
    yield all([
        fork(watchAsync)
    ])
}
