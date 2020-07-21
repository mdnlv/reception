import {FETCH_INFO_BOOKS_ERROR, FETCH_INFO_BOOKS_SUCCESS, InfoBooksActionsTypes, InfoBooksState} from "./types";
import InfoItemResponse from "../../interfaces/responses/infoBooks/InfoItemResponse";

export const initialState: InfoBooksState = {
    infoBooks: [] as InfoItemResponse[],
    error: ''
}

export function InfoBookReducer(
    state=initialState,
    action: InfoBooksActionsTypes) {
    switch (action.type) {
        case FETCH_INFO_BOOKS_SUCCESS:
            return {
                ...state,
                infoBooks: action.payload
            }
        case FETCH_INFO_BOOKS_ERROR:
            return {
                ...state,
                error: 'FETCH_INFO_BOOKS_ERROR'
            }
        default:
            return initialState
    }
}
