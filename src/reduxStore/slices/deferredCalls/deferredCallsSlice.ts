import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import { notification } from "antd";


import DeferredCallsService from "../../../services/DeferredCallsService";
import {DeferredCallsState} from "./types";

const initialState: DeferredCallsState = {
    queue: [],
    josForm:{
    date: null,
    patient:"",
    doctor:"",
    organisation:"",
    specialty:"",
    сomment: ""
    },
    patientList: [],
    doctors: [],
    specialty:[],
    loading: false
}

export const fetchDeferredQueue = createAsyncThunk(
    'deferredQueue/fetchQueue',
    async (_, thunkAPI) => {
        thunkAPI.dispatch(setLoading(true));
        try {
            const response = await DeferredCallsService.getDeferredCalls();
            if(response.data && response.status === 200){
                return response.data;
            }
        } catch (e) {
            alert(e)
        } finally {
            thunkAPI.dispatch(setLoading(false));
        }
    }
)
export const saveDeferredCall = createAsyncThunk(
    'deferredQueue/saveQueue',
    async (payload: { data:any }, thunkAPI) => {
        thunkAPI.dispatch(setLoading(true));
        try {
            const response = await DeferredCallsService.saveDeferredCall(payload.data);
            if(response.data && response.status === 200){

                notification.success({
                    message: `Успех`,
                    description: "форма сохранена",
                  });
          

                return response.data;
            }
        } catch (e) {
            notification.error({
                message: `Ошибка`,
                description: "не удалось сохранить форму",
              });
      
        } finally {
            thunkAPI.dispatch(setLoading(false));
        }
    }
)

export const getPersonList = createAsyncThunk(
    'deferredQueue/getPersonList',
    async (payload: { data:any }, thunkAPI) => {
        thunkAPI.dispatch(setLoading(true));
        try {

           const { rb }:any = thunkAPI.getState()

                  let specialty:any = []
                  payload.data.forEach((item:any) => {
                      const filteredSpeciality = rb.rbSpeciality.filter((s:any)=> item.speciality_id === s.id)
                      specialty =  [...specialty,...filteredSpeciality].filter((thing, index, self) =>
                      index === self.findIndex((t) => (
                        t.code === thing.code 
                      ))
                    )
                });   
          const doctors =  payload.data.map((item:any) => {
            return {
                ...item,
                fullName:`${item.lastName} ${item.firstName} ${item.patrName}`
            }
        })

                return {
                    doctors: doctors,
                    specialty: specialty 
                };
        } catch (e) {
            alert(e)
        } finally {
        }
    }
)


const deferredCallsSlice = createSlice({
    name: "deferredCalls",
    initialState,
    reducers: {
        setLoading: (state, action: PayloadAction<boolean>) => {
            state.loading = action.payload
        },
    },
    extraReducers: (builder) => {
        builder.addCase(fetchDeferredQueue.fulfilled, (state, action) => {
            if(action.payload){
                state.queue = action.payload.map(item => ({
                    id: item.action_id,
                    fullName: `${item.client.firstName} ${item.client.patrName} ${item.client.lastName}`,
                    patientId: item.client_id,
                    contact: item.contact || "",
                    netrica: item.netrica_code,
                    orgId: item.orgStructure_id,
                    maxDate: item.maxDate,
                    specialityId: item.speciality_id,
                    personId: item.person_id,
                }))
            }
        });
        builder.addCase(getPersonList.fulfilled, (state, action) => {
            state.doctors = action.payload?.doctors       
            state.specialty = action.payload?.specialty
        })
    }
})

export const {setLoading} = deferredCallsSlice.actions
export default deferredCallsSlice
