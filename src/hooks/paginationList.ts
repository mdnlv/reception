import {useState} from "react";

type PaginationPayload = {
    len: number
    numberPerPage: number
}

export function usePaginationList(payload: PaginationPayload) {
    const totalPages = payload.len / payload.numberPerPage
    const [currentPage, setCurrentPage] = useState(1)

    function nextPage() {
        if(currentPage + 1 < totalPages){
            setCurrentPage(currentPage + 1)
        }
    }

    function prevPage() {
        if(currentPage - 1 >= 0){
            setCurrentPage(currentPage - 1)
        }
    }

    return {currentPage, totalPages,  nextPage, prevPage, setCurrentPage}

}
