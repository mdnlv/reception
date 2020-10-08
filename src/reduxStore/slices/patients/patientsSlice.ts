import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import Patient from '../../../types/data/Patient';
import PatientsService from '../../../services/PatientsService';
import transformPatientsFilters from '../../utils/transform/transformPatientsFilters';
import transformPatientResponse from '../../utils/transform/transformPatientResponse';

export const fetchPatients = createAsyncThunk(
  'patients/fetchPatients',
  async (payload: { limit?: number; offset?: number }, thunkAPI) => {
    try {
      thunkAPI.dispatch(setLoading(true));
      const { limit, offset } = payload;
      const response = await PatientsService.fetchPatients(
        limit || 0,
        offset || 0,
      );
      if (response.status == 200 && response.data) {
        return response.data;
      }
    } catch (e) {
    } finally {
      thunkAPI.dispatch(setLoading(false));
    }
  },
);

export interface PatientsSearchFiltersType {
  tempInvalidDocumentBegDate: string;
  tempInvalidDocumentEndDate: string;
  tempInvalidDocumentSerial: string;
  tempInvalidDocumentNumber: string;
  tempInvalidDocumentTypeId: number;
  tempInvalidReasonId: number;
  createPersonId: number;
  modifyPersonId: number;
  begModifyDatetime: string;
  endModifyDatetime: string;
  begBirthDate: string;
  endBirthDate: string;
  isEmptyAddress: 0 | 1;
  areaTypeId: number;
  areaOrgStructureId: number;
  bedProfileTypeId: 0 | 1 | 2 | 3 | 4;
  bedProfileOrgStructureId: number;
  isAttachment: 0 | 1;
  attachmentCategoryId: 0 | 1 | 2 | 3;
  attachmentTypeId: number;
  isAttachNonBase: 0 | 1;
  attachmentOrganisationId: number;
  begDateRPFConfirmed: string;
  endDateRPFConfirmed: string;
  isRPFUnconfirmed: 0 | 1;
  isOncologyForm90: 0 | 1;
  isClientExamPlan: 0 | 1;
  clientExamPlanKindId: 0 | 1 | 2;
  clientExamPlanYear: number;
  clientExamPlanQuarter: number;
  identifierSystemId: number;
  identifier: string;
}

export const fetchFiltersPatients = createAsyncThunk(
  'patients/fetchFiltersPatients',
  async (filters: Partial<PatientsSearchFiltersType>, thunkAPI) => {
    thunkAPI.dispatch(setLoading(true));
    try {
      console.log(transformPatientsFilters(filters));
      const response = await PatientsService.detailedQueryPatients(
        transformPatientsFilters(filters),
      );
      if (response.data) {
        console.log(response);
      }
    } catch (e) {
    } finally {
      thunkAPI.dispatch(setLoading(false));
    }
  },
);

const patientSlice = createSlice({
  name: 'patients',
  initialState: {
    patients: [] as Patient[],
    currentPatient: 0,
    isLoading: false,
    foundPatients: [] as Patient[],
  },
  reducers: {
    setCurrentPatient: (state, action: PayloadAction<number>) => {
      state.currentPatient = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchPatients.fulfilled, (state, action) => {
      state.patients =
        action.payload?.map((item, index) => ({
          ...transformPatientResponse(item),
          code: index,
        })) || [];
    });
  },
});

export const { setLoading, setCurrentPatient } = patientSlice.actions;
export default patientSlice;
