import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import patientSlice from './slices/patients/patientsSlice';
import rbSlice from './slices/rb/rbSlice';
import patientCardSlice from './slices/patientCard/patientCardSlice';
import registrationCardSlice from './slices/registrationCard/registrationCardSlice';

const store = configureStore({
  reducer: {
    patients: patientSlice.reducer,
    rb: rbSlice.reducer,
    patientCard: patientCardSlice.reducer,
    registrationCard: registrationCardSlice.reducer,
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
