import {FETCH_INFO_BOOKS, FETCH_INFO_BOOKS_ERROR, FETCH_INFO_BOOKS_SUCCESS, InfoBooksActionsTypes} from "./types";
import InfoItemResponse from "../../interfaces/responses/infoBooks/InfoItemResponse";

export function fetchInfoBook(): InfoBooksActionsTypes {
    return {
        type: FETCH_INFO_BOOKS
    }
}

export function fetchInfoBooksSuccess(data: InfoItemResponse[]): InfoBooksActionsTypes {
    return {
        type: FETCH_INFO_BOOKS_SUCCESS,
        payload: data
    }
}

export function fetchInfoBooksError(): InfoBooksActionsTypes {
    return {
        type: FETCH_INFO_BOOKS_ERROR,
    }
}
