import InfoItemResponse from "../../interfaces/responses/infoBooks/InfoItemResponse";

export const FETCH_INFO_BOOKS = 'FETCH_INFO_BOOKS'
export const FETCH_INFO_BOOKS_SUCCESS = 'FETCH_INFO_BOOKS_SUCCESS'
export const FETCH_INFO_BOOKS_ERROR = 'FETCH_INFO_BOOKS_ERROR'

export interface FETCH_INFO_BOOKS {
    type: typeof FETCH_INFO_BOOKS,
}

export interface FETCH_INFO_BOOKS_SUCCESS {
    type: typeof FETCH_INFO_BOOKS_SUCCESS,
    payload: any[]
}

export interface FETCH_INFO_BOOKS_ERROR {
    type: typeof FETCH_INFO_BOOKS_ERROR,
}

export interface InfoBooksState {
    infoBooks: InfoItemResponse[],
    error: string
}


export type InfoBooksActionsTypes = FETCH_INFO_BOOKS | FETCH_INFO_BOOKS_SUCCESS | FETCH_INFO_BOOKS_ERROR
