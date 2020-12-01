import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import DeferredCallsService from "../../../services/DeferredCallsService";
import DeferredCall from "../../../types/data/DeferredCall";

interface DeferredCallsState {
    queue: DeferredCall[],
    loading: boolean
}

const initialState: DeferredCallsState = {
    queue: [],
    loading: false
}

export const fetchDeferredQueue = createAsyncThunk(
    'deferredQueue/fetchQueue',
    async (_, thunkAPI) => {
        thunkAPI.dispatch(setLoading(true));
        try{
            const response = await DeferredCallsService.getDeferredCalls();
            if(response.data && response.status === 200){
                return response.data;
            }
        }catch (e) {

        }finally {
            thunkAPI.dispatch(setLoading(false));
        }
    }
)

const deferredCallsSlice = createSlice({
    name: "deferredCalls",
    initialState,
    reducers: {
        setLoading: (state, action: PayloadAction<boolean>) => {
            state.loading = action.payload
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchDeferredQueue.fulfilled, (state, action) => {
            if(action.payload){
                state.queue = action.payload.map(item => ({
                    id: item.action_id,
                    fullName: item.patient_fullname,
                    patientId: item.client_id,
                    contact: item.contact,
                    netrica: item.netrica_code,
                    orgId: item.orgStructure_id,
                    maxDate: item.maxDate,
                    specialityId: item.speciality_id,
                    personId: item.person_id,
                }))
            }
        })
    }
})

export const {setLoading} = deferredCallsSlice.actions
export default deferredCallsSlice
