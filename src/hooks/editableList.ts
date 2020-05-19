import {useState} from "react";

export function useEditableList<T>(state: T[]) {
    const [listState, setListState] = useState<T[]>([])

    function addNewItem(item: T) {
        setListState([...listState, item])
    }

    function deleteLastItem() {
        setListState([...listState.slice(0,(listState.length - 1))])
    }

    return {listState, addNewItem, deleteLastItem}
}
