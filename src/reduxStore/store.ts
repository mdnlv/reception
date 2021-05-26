import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';

import patientSlice from './slices/patients/patientsSlice';
import rbSlice from './slices/rb/rbSlice';
import patientCardSlice from './slices/patientCard/patientCardSlice';
import registrationCardSlice from './slices/registrationCard/registrationCardSlice';
import scheduleSlice from './slices/scheduleSlice/scheduleSlice';
import personTreeSlice from './slices/personTree/personTreeSlice';
import deferredCallsSlice from "./slices/deferredCalls/deferredCallsSlice";
import authSlice from "./slices/auth/authSlice";

const store = configureStore({
  reducer: {
    patients: patientSlice.reducer,
    rb: rbSlice.reducer,
    patientCard: patientCardSlice.reducer,
    registrationCard: registrationCardSlice.reducer,
    schedule: scheduleSlice.reducer,
    person_tree: personTreeSlice.reducer,
    deferredCalls: deferredCallsSlice.reducer,
    auth: authSlice.reducer
  },
  middleware: [
    ...getDefaultMiddleware({
      immutableCheck: false,
      serializableCheck: false,
    }),
  ],
});

export type RootState = ReturnType<typeof store.getState>;

export default store;
