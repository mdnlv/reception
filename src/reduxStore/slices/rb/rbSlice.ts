import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

import Person from '../../../types/data/Person';
import EventType from '../../../types/data/EventType';
import Organisation from '../../../types/data/Organisation';
import InvalidReason from '../../../types/data/InvalidReason';
import InvalidDocument from '../../../types/data/InvalidDocument';
import AccountingSystemItem from '../../../types/data/AccountinSystemItem';
import AttachType from '../../../types/data/AttachType';
import RbService from '../../../services/RbService';
import PolicyType from '../../../types/data/PolicyType';
import PolicyKind from '../../../types/data/PolicyKind';
import PatientContactType from '../../../types/data/PatientContactType';
import PatientDocumentType from '../../../types/data/PatientDocumentType';

export const fetchRbPersons = createAsyncThunk('rb/fetchPersons', async () => {
  try {
    const response = await RbService.fetchPersons();
    if (response.data) {
      const formattedData = response.data.map((item) => ({
        id: item.id,
        createDatetime: item.createDatetime,
        createPersonId: item.createPerson_id,
        modifyDatetime: item.modifyDatetime,
        modifyPersonId: item.modifyPerson_id,
        code: item.code,
        lastName: item.lastName,
        firstName: item.firstName,
        patrName: item.patrName,
        postId: item.post_id,
        specialityId: item.speciality_id,
      }));
      return formattedData;
    }
  } catch (e) {
  } finally {
  }
});

export const fetchRbEventTypes = createAsyncThunk(
  'rb/fetchEventTypes',
  async () => {
    try {
      const response = await RbService.fetchEventTypes();
      if (response.data) {
        const formattedData: EventType[] = response.data.map((item) => ({
          id: item.id,
          createDatetime: item.createDatetime,
          createPersonId: item.createPerson_id,
          eventTypeId: item.eventType_id,
          code: item.code,
          name: item.name,
        }));
        return formattedData;
      }
    } catch (e) {
    } finally {
    }
  },
);

export const fetchRbOrganisations = createAsyncThunk(
  'rb/fetchOrganisations',
  async (arg, thunkAPI) => {
    thunkAPI.dispatch(setLoading({ type: 'organisations', value: true }));
    try {
      const response = await RbService.fetchOrganisation();
      if (response.data) {
        return response.data;
      }
    } catch (e) {
      thunkAPI.rejectWithValue(e);
    } finally {
      thunkAPI.dispatch(setLoading({ type: 'organisations', value: false }));
    }
  },
);

export const fetchRbInvalidReasons = createAsyncThunk(
  'rb/fetchInvalidReasons',
  async () => {
    try {
      const response = await RbService.fetchInvalidReasons();
      if (response.data) {
        return response.data;
      }
    } catch (e) {}
  },
);

export const fetchRbDocumentTypes = createAsyncThunk(
  'rb/fetchDocumentTypes',
  async (arg, thunkAPI) => {
    thunkAPI.dispatch(setLoading({ type: 'documentTypes', value: true }));
    try {
      const response = await RbService.fetchDocumentTypes();
      if (response.data) {
        return response.data.map((item) => ({
          id: item.id,
          name: item.name,
        }));
      }
    } catch (e) {
    } finally {
      thunkAPI.dispatch(setLoading({ type: 'documentTypes', value: false }));
    }
  },
);

export const fetchRbInvalidDocumentsTypes = createAsyncThunk(
  'rb/fetchInvaludDocuments',
  async () => {
    try {
      const response = await RbService.fetchInvalidDocumentTypes();
      if (response.data) {
        const formattedData = response.data.map((item) => ({
          id: item.id,
          name: item.name,
          code: item.code,
        }));
        return formattedData;
      }
    } catch (e) {}
  },
);

export const fetchRbAccountingSystem = createAsyncThunk(
  'rb/fetchAccountingSystem',
  async () => {
    try {
      const response = await RbService.fetchAccountingSystem();
      if (response.data) {
        const formattedData = response.data.map((item) => ({
          id: item.id,
          name: item.name,
        }));
        return formattedData;
      }
    } catch (e) {}
  },
);

export const fetchRbAttachTypes = createAsyncThunk(
  'rb/fetchAttachTypes',
  async () => {
    try {
      const response = await RbService.fetchAttachTypes();
      if (response.data) {
        const formattedData = response.data.map((item) => ({
          id: item.id,
          name: item.name,
        }));
        return formattedData;
      }
    } catch (e) {}
  },
);

export const fetchRbPolicyTypes = createAsyncThunk(
  'rb/fetchPolicyTypes',
  async () => {
    try {
      const response = await RbService.fetchPolicyTypes();
      if (response.data) {
        return response.data.map((item) => ({
          id: item.id,
          name: item.name,
        }));
      }
    } catch (e) {}
  },
);

export const fetchRbPolicyKind = createAsyncThunk(
  'rb/fetchPolicyKind',
  async () => {
    try {
      const response = await RbService.fetchPolicyKind();
      if (response.data) {
        return response.data.map((item) => ({
          id: item.id,
          name: item.name,
        }));
      }
    } catch (e) {}
  },
);

export const fetchRbContactTypes = createAsyncThunk(
  'rb/fetchContactTypes',
  async () => {
    try {
      const response = await RbService.fetchContactTypes();
      if (response.data) {
        return response.data.map((item) => ({
          id: item.id,
          name: item.name,
          mask: item.mask.replace(/[0-9]/g, '1'),
        }));
      }
    } catch (e) {}
  },
);

const rbSlice = createSlice({
  name: 'rb',
  initialState: {
    rbPersons: [] as Person[],
    rbEventTypes: [] as EventType[],
    rbOrganisations: [] as Organisation[],
    rbInvalidReasons: [] as InvalidReason[],
    rbInvalidDocuments: [] as InvalidDocument[],
    rbAccountingSystem: [] as AccountingSystemItem[],
    rbAttachTypes: [] as AttachType[],
    rbPolicyTypes: [] as PolicyType[],
    rbPolicyKinds: [] as PolicyKind[],
    rbContactTypes: [] as PatientContactType[],
    rbDocumentTypes: [] as PatientDocumentType[],
    loading: {
      organisations: false,
      documentTypes: false,
    },
  },
  reducers: {
    setLoading: (
      state,
      action: PayloadAction<{
        type: 'organisations' | 'documentTypes';
        value: boolean;
      }>,
    ) => {
      state.loading[action.payload.type] = action.payload.value;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchRbPersons.fulfilled, (state, action) => {
      if (action.payload) {
        state.rbPersons = action.payload;
      }
    });
    builder.addCase(fetchRbEventTypes.fulfilled, (state, action) => {
      if (action.payload) {
        state.rbEventTypes = action.payload;
      }
    });
    builder.addCase(fetchRbOrganisations.fulfilled, (state, action) => {
      if (action.payload) {
        state.rbOrganisations = action.payload.map((item) => ({
          id: item.id,
          fullName: item.fullName,
          shortName: item.shortName,
          isInsurer: !!item.isInsurer,
        }));
      }
    });
    builder.addCase(fetchRbInvalidReasons.fulfilled, (state, action) => {
      if (action.payload) {
        state.rbInvalidReasons = action.payload;
      }
    });
    builder.addCase(fetchRbInvalidDocumentsTypes.fulfilled, (state, action) => {
      if (action.payload) {
        state.rbInvalidDocuments = action.payload;
      }
    });
    builder.addCase(fetchRbAccountingSystem.fulfilled, (state, action) => {
      if (action.payload) {
        state.rbAccountingSystem = action.payload;
      }
    });
    builder.addCase(fetchRbAttachTypes.fulfilled, (state, action) => {
      if (action.payload) {
        state.rbAttachTypes = action.payload;
      }
    });
    builder.addCase(fetchRbPolicyTypes.fulfilled, (state, action) => {
      if (action.payload) {
        state.rbPolicyTypes = action.payload;
      }
    });
    builder.addCase(fetchRbPolicyKind.fulfilled, (state, action) => {
      if (action.payload) {
        state.rbPolicyKinds = action.payload;
      }
    });
    builder.addCase(fetchRbDocumentTypes.fulfilled, (state, action) => {
      if (action.payload) {
        state.rbDocumentTypes = action.payload;
      }
    });
    builder.addCase(fetchRbContactTypes.fulfilled, (state, action) => {
      if (action.payload) {
        state.rbContactTypes = action.payload;
      }
    });
  },
});

export const { setLoading } = rbSlice.actions;
export default rbSlice;
