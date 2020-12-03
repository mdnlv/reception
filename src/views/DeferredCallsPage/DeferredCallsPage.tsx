import React, {useEffect} from "react";
import DeferredCallsTable from "../../components/tables/DeferredCallsTable/DeferredCallsTable";
import './styles.scss'
import {useDispatch, useSelector} from "react-redux";
import {detailedDeferredCalls} from "../../reduxStore/slices/deferredCalls/selectors";
import {RootState} from "../../reduxStore/store";
import {fetchDeferredQueue} from "../../reduxStore/slices/deferredCalls/deferredCallsSlice";

const DeferredCallsPage: React.FC = (props) => {
    const dispatch = useDispatch()
    const calls = useSelector(detailedDeferredCalls)
    const isLoading = useSelector((state: RootState) => state.deferredCalls.loading)

    useEffect(() => {
        dispatch(fetchDeferredQueue())
    }, [])

    return (
        <div className={'deferred-calls-page'}>
            <DeferredCallsTable data={calls} isLoading={isLoading} />
        </div>
    )
}

export default DeferredCallsPage
