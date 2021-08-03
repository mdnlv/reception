import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import moment from 'moment';

import { ActionPost } from '../../../components/elements/Schedule/types';
import ScheduleService from '../../../services/ScheduleService';
import {Schedule, ScheduleOne, Ticket, ActionData} from "./types";
import {RootState} from "../../store";

export const fetchSchedules = createAsyncThunk(
  'schedule/fetchSchedules',
  async (payload: { id: number[]; beg_date: string, end_date: string, showEmpty?: boolean}, thunkAPI) => {
    const state = thunkAPI.getState() as RootState;
    thunkAPI.dispatch(setLoading(true));
    try {
      const response = await ScheduleService.fetchSchedule(state.auth.token, payload);
      if (response.data) {
        return response.data;
      }
    } catch (e) {
      console.log(e)
    } finally {
      thunkAPI.dispatch(setLoading(false));
    }
  },
);

export const fetchItem = createAsyncThunk(
  'schedule/fetchItem',
  async (payload: { id: number; date: string}, thunkAPI) => {
    const state = thunkAPI.getState() as RootState;
    thunkAPI.dispatch(setLoading(true));
    try {
      const response = await ScheduleService.fetchItem(state.auth.token, payload);
      if (response.data) {
        return response.data;
      }
    } catch (e) {
      console.log(e)
    } finally {
      thunkAPI.dispatch(setLoading(false));
    }
  },
);

export const fetchItems = createAsyncThunk(
  'schedule/fetchItems',
  async (payload: { ids: number[], beg_date: string, end_date: string, showEmpty?: boolean}, thunkAPI) => {
    const state = thunkAPI.getState() as RootState;
    thunkAPI.dispatch(setLoading(true));
    try {
      const response = await ScheduleService.fetchItems(state.auth.token, payload);
      if (response.data) {
        return response.data;
      }
    } catch (e) {
      console.log(e)
    } finally {
      thunkAPI.dispatch(setLoading(false));
    }
  },
);

export const clientAppointment = createAsyncThunk(
  'schedule/clientAppointment',
  async (payload: { client_id: number; beg_date?: string, end_date?: string, is_past_records?: boolean }, thunkAPI) => {
    const state = thunkAPI.getState() as RootState;
    thunkAPI.dispatch(setTicketsLoading(true));
    try {
      const response = await ScheduleService.clientAppointment(state.auth.token, payload);
      if (response.data) {
        return response.data;
      }
    } catch (e) {
      console.log(e)
    } finally {
      thunkAPI.dispatch(setTicketsLoading(false));
    }
  },
);

export const actionTicket = createAsyncThunk(
  'schedule/actionTicket',
  async (payload: {data: ActionPost, id: number[]; beg_date: string, end_date: string}, thunkAPI) => {
    const state = thunkAPI.getState() as RootState;
    thunkAPI.dispatch(setPostLoading(true));
    thunkAPI.dispatch(setLoading(true));
    thunkAPI.dispatch(setErrorStatus(false));
    try {
      const res = await ScheduleService.actionTicket(state.auth.token, payload.data);
      if (res && res.status !== 200) {
        thunkAPI.dispatch(setErrorStatus(true));
        res && thunkAPI.dispatch(setErrorMessage(res.status + ': ' + res.statusText));
      }
    } catch (e: any) {
      thunkAPI.dispatch(setErrorMessage(e.message));
      thunkAPI.dispatch(setErrorStatus(true));
    } finally {
      const response = await ScheduleService.fetchSchedule(
        state.auth.token,
        {
          id: payload.id,
          beg_date: payload.beg_date,
          end_date:payload.end_date
        });
      thunkAPI.dispatch(setLoading(false));
      thunkAPI.dispatch(setPostLoading(false))
      if (response.data) {
        return response.data;
      }
    }
  },
);

export const setDates = createAsyncThunk(
  'schedule/setDates',
  async (payload: {cd: Date, ed: Date}, thunkAPI) => {
    thunkAPI.dispatch(setCurrentDate(payload.cd));
    thunkAPI.dispatch(setRangeWeekDate(payload.ed));
  },
);

const scheduleSlice = createSlice({
  name: 'schedule',
  initialState: {
    schedule: {} as ScheduleOne,
    schedules: {} as Schedule,
    tickets: [] as Ticket[],
    isLoading: false,
    postLoading: false,
    errorMessage: '',
    errorStatus: false,
    currentDate: new Date,
    rangeWeekDate: new Date,
    ticketsLoading: false,
    actionData: {} as any
  },

  reducers: {
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setPostLoading: (state, action: PayloadAction<boolean>) => {
      state.postLoading = action.payload;
    },
    setErrorStatus: (state, action: PayloadAction<boolean>) => {
      state.errorStatus = action.payload;
    },
    setErrorMessage: (state, action: PayloadAction<string>) => {
      state.errorMessage = action.payload;
    },
    setCurrentDate: (state, action: PayloadAction<Date>) => {
      state.currentDate = action.payload;
    },
    setRangeWeekDate: (state, action: PayloadAction<Date>) => {
      state.rangeWeekDate = action.payload;
    },
    setTicketsLoading: (state, action: PayloadAction<boolean>) => {
      state.ticketsLoading = action.payload;
    },
    setStoreActionData: (state, action: PayloadAction<any>) => {
      state.actionData = action.payload;
    },
  },

  extraReducers: (builder) => {
    builder.addCase(fetchSchedules.fulfilled, (state, action) => {
      for(let id of action.meta.arg.id) {
        if(action.payload && action.payload[id]) {
          if(state.schedules[id]) {
            state.schedules[id] = action.payload[id];
          } else {
            let obj = Object.assign(state.schedules, action.payload);
            state.schedules = obj;
          }
        } else {
          delete state.schedules[id];
        }
      }
    });

    builder.addCase(fetchItems.fulfilled, (state, action) => {
      if(action.payload) {

        let key =  Object.keys(action.payload)[0];
        let value: any = Object.values(action.payload)[0];
        if(state.schedules[Number(key)]) {
          state.schedules[Number(key)] = value;
        } else {
          let obj = Object.assign(state.schedules, action.payload);
          state.schedules = obj;
        }
      }
    });

    builder.addCase(actionTicket.fulfilled, (state, action) => {
      for(let id of action.meta.arg.id) {
        if(action.payload && action.payload[id]) {
          if(state.schedules[id]) {
            state.schedules[id] = action.payload[id];
          } else {
            let obj = Object.assign(state.schedules, action.payload);
            state.schedules = obj;
          }
        } else {
          delete state.schedules[id];
        }
      }
    });

    builder.addCase(clientAppointment.fulfilled, (state, action) => {
      state.tickets = [];
      if(action.payload) {
        Object.values(action.payload).map((person: any) => {
          Object.keys(person.schedule).map((date: any)=>{
            person.schedule[date][0].tickets.map((ticket: any) => {
              state.tickets.push({
                person: person.person.lastName + ' ' + person.person.firstName[0] + '.' + person.person.patrName[0] + '.',
                office: person.schedule[date][0].office,
                date: moment(date).format("DD.MM.YYYY"),
                time: ticket.begDateTime.slice(0,-3),
                visit: ticket.visit,
                note: ticket.note,
                set_person: ticket.set_person ? ticket.set_person.lastName + ' ' + ticket.set_person.firstName[0] + '.' + ticket.set_person.patrName[0] + '.' : '',
                actionData: {
                  date: date? moment(date).format("DD.MM.YYYY") : '',
                  time: ticket && ticket.begDateTime ? ticket.begDateTime.slice(0,-3): '',
                  client: (ticket?.client && ticket.client.id)? ticket.client.lastName + ' ' + ticket.client.firstName[0] + '.' + ticket.client.patrName[0] + '.': '',
                  person: person? person.person.lastName + ' ' + person.person.firstName[0] + '.' + person.person.patrName[0] + '.': '',
                  speciality:  person? person.person.speciality_id : '',
                  type: "1",
                  data: {
                    action_id: person.schedule[date][0].action_id,
                    idx:  ticket.idx,
                    client_id: (ticket.client && ticket.client.id)? ticket.client.id : -1,
                    person_id:  person? person.person.id : 0,
                    user_id: 614,
                    index: ticket? ticket.index: '',
                    old_action_id: 0,
                    old_idx: 0,
                    type: 'new'
                  },
                  org: person.person.orgStructure_id,
                  orgs: [...person.person.orgStructure_ids, person.person.orgStructure_id]
                }
              })
            })
          })
        })
      }
    });

    builder.addCase(fetchItem.fulfilled, (state, action) => {
      state.schedule = action.payload;
    });

  },
});

export const { setLoading, setPostLoading, setErrorStatus, setErrorMessage, setCurrentDate, setRangeWeekDate, setTicketsLoading, setStoreActionData } = scheduleSlice.actions;
export default scheduleSlice;
