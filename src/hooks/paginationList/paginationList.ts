import {useState} from "react";

import {PaginationPayload} from "./types";

export const usePaginationList = (payload: PaginationPayload) => {
    const totalPages = payload.len / payload.numberPerPage
    const [currentPage, setCurrentPage] = useState(1)

    const nextPage = () => {
        if(currentPage + 1 < totalPages){
            setCurrentPage(currentPage + 1)
        }
    }

    const prevPage = () => {
        if(currentPage - 1 >= 0){
            setCurrentPage(currentPage - 1)
        }
    }

    return {currentPage, totalPages,  nextPage, prevPage, setCurrentPage}
}
