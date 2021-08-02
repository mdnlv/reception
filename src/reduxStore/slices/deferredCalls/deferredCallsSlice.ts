import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import { notification } from "antd";
import { format } from "date-fns";
import DeferredCallsService from "../../../services/DeferredCallsService";
import {DeferredCallsState} from "./types";
import {RootState} from "../../store";

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
    doctors: []  as any,
    specialty:[],
    post:[],
    filteredDoctors: [],
    loading: false
}

export const fetchDeferredQueue = createAsyncThunk(
    'deferredQueue/fetchQueue',
    async (_, thunkAPI) => {
        const state = thunkAPI.getState() as RootState;
        thunkAPI.dispatch(setLoading(true));
        try {
            const response = await DeferredCallsService.getDeferredCalls(state.auth.token);
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
        const state = thunkAPI.getState() as RootState;
        thunkAPI.dispatch(setLoading(true));
        try {
            const response = await DeferredCallsService.saveDeferredCall(state.auth.token, payload.data);
            if(response.data && response.status === 200){

                notification.success({
                    message: `Форма успешно сохранена`,
                  });
                  thunkAPI.dispatch(fetchDeferredQueue())

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
        try {

           const { rb }:any = thunkAPI.getState()

                  let specialty:any = []
                  let post:any = []
                  payload.data.forEach((item:any) => {
                      const filteredSpeciality = rb.rbSpeciality.filter((s:any)=> item.speciality_id === s.id)
                      specialty =  [...specialty,...filteredSpeciality].filter((thing, index, self) =>
                      index === self.findIndex((t) => (
                        t.code === thing.code
                      ))
                    )
                  });
                  payload.data.forEach((item:any) => {
                    const filteredPost = rb.rbPost.filter((s:any)=> item.post_id === s.id)
                    post =  [...post,...filteredPost].filter((thing, index, self) =>
                    index === self.findIndex((t) => (
                      t.id === thing.id
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
                    specialty: specialty,
                    post: post
                };

        } catch (e) {
            alert(e)
        } finally {
        }
    }
)

export const filterDoctors = createAsyncThunk(
    'deferredQueue/filterDoctors',
    async (payload: { id:number }, thunkAPI) => {

        const { deferredCalls }:any = thunkAPI.getState()


      const  filteredDoctors =  deferredCalls.doctors.filter((doctor:any)=>doctor.speciality_id === payload.id)

        try {
            return  {filteredDoctors:filteredDoctors}

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
        clearLists: (state) => {
            state.doctors = []
            state.specialty = []
            state.filteredDoctors = []
        },
        clearDoctors: (state) => {
            state.filteredDoctors = []
        },
    },
    extraReducers: (builder) => {
        builder.addCase(fetchDeferredQueue.fulfilled, (state, action) => {
            if(action.payload){

                state.queue = action.payload.map(item => ({
                    id: item.action_id,
                    fullName: `${item.client.firstName} ${item.client.patrName} ${item.client.lastName}`,
                    person: item.person ?`${item.person.firstName} ${item.person.patrName} ${item.person.lastName}`:'',
                    patientId: item.client_id,
                    contact: item.contact || "",
                    clientId: item.client_id,
                    netrica: item.netrica_code,
                    status: item.status_id,
                    comment: item.comment,
                    birthday:  item.client.birthDate,
                    orgId: item.orgStructure_id,
                    maxDate: format(Date.parse(item.maxDate), "dd.MM.yyyy"),
                    createdDate:format(Date.parse(item.createDatetime), "dd.MM.yyyy"),
                    specialityId: item.speciality_id,
                    personId: item.person_id,
                }))
            }
        });
        builder.addCase(getPersonList.fulfilled, (state, action) => {
            state.doctors = action.payload?.doctors
            state.specialty = action.payload?.specialty
        })
        builder.addCase(filterDoctors.fulfilled, (state, action) => {
            state.filteredDoctors = action.payload?.filteredDoctors
        })
    }
})

export const {setLoading,clearLists,clearDoctors} = deferredCallsSlice.actions
export default deferredCallsSlice
