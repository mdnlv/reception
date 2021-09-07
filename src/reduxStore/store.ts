import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';

import patientSlice from './slices/patients/patientsSlice';
import rbSlice from './slices/rb/rbSlice';
import registrationCardSlice from './slices/registrationCard/registrationCardSlice';
import personTreeSlice from "./slices/personTree/personTreeSlice";

const store = configureStore({
  reducer: {
    patients: patientSlice.reducer,
    rb: rbSlice.reducer,
    registrationCard: registrationCardSlice.reducer,
    personTree: personTreeSlice.reducer,
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
