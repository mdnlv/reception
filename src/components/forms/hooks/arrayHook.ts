import {useFieldArray} from "react-hook-form";

export default  function useArrayFieldsHook(fieldName: string){
    const {fields, append, remove} = useFieldArray({
        name: fieldName
    })

    function addItem() {
        append({})
    }

    function removeLast() {
        if(fields.length > 0){
            remove(fields.length - 1)
        }
    }

    return {addItem, removeLast, fields}


}
