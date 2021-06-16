import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import {format, parseISO} from "date-fns";

import initialState from './initialState';
import RbService from '../../../services/RbService';
import FindPolicyParams from '../../../interfaces/payloads/patients/findPatientPolicy';
import PatientsService from '../../../services/PatientsService/PatientsService';
import transformPolicySearchResponse from "../../utils/transform/transformPolicySearchResponse";
import { WizardStateType } from '../../../components/forms/wizards/RegCardWizard/types';
import { RootState } from '../../store';
import { KladrDocType } from './types';
import { transformPatientResponse } from '../../utils/transform/transformPatientResponse';
import {PassportAddressType} from "../../../components/forms/wizards/RegCardWizard/pages/PassportGeneral/types";
import {getSaveRegCardPayload} from "../../../utils/getSaveRegCardPayload";
import PatientAddedResponse from "../../../interfaces/responses/patients/patientAdded";

export const fetchIdPatient = createAsyncThunk(
  `patients/fetchIdPatient`,
  async (id: number, thunkAPI) => {
    thunkAPI.dispatch(setLoading({ type: 'idPatient', value: true }));
    try {
      const response = await PatientsService.fetchIdPatient(id);
      if (response.status === 200) {
        return response.data;
      } else {
        thunkAPI.dispatch(fetchIdPatientError());
      }
    } catch (e) {
      alert(e);
      thunkAPI.dispatch(fetchIdPatientError());
    } finally {
      thunkAPI.dispatch(setLoading({ type: 'idPatient', value: false }));
    }
  },
);

export const fetchKladr = createAsyncThunk(
  'registrationCard/fetchKladr',
  async (payload: { id?: number; type?: KladrDocType }, thunkAPI) => {
    thunkAPI.dispatch(setKladrLoading({ value: true, type: payload.type }));
    try {
      const response = await RbService.getRegionList();
      if (response.data) {
        const formattedData = response.data.map((item) => ({
          id: item.CODE,
          name: item.NAME,
          prefix: item.prefix,
          socr: item.SOCR,
          infis: item.infis,
        }));
        return { items: formattedData, type: payload.type };
      }
    } catch (e) {
      alert(e)
    } finally {
      thunkAPI.dispatch(setKladrLoading({ value: false, type: payload.type }));
    }
  },
);

export const fetchKladrNested = createAsyncThunk(
  'registrationCard/fetchKladrNested',
  async (payload: { id: string; type?: KladrDocType, value?:string }, thunkAPI) => {
    thunkAPI.dispatch(
      setKladrNestedLoading({ value: true, type: payload.type }),
    );
    try {
      const response = await RbService.getRegionList(payload.id,payload.value);
      if (response.data) {
        const formattedData = response.data.map((item) => ({
          id: item.CODE,
          name: item.NAME,
          prefix: item.prefix,
          socr: item.SOCR,
          infis: item.infis,
        }));
        return { items: formattedData, type: payload.type };
      }
    } catch (e) {
      alert(e)
    } finally {
      thunkAPI.dispatch(
        setKladrNestedLoading({ value: false, type: payload.type }),
      );
    }
  },
);

export const fetchKladrStreets = createAsyncThunk(
  'registrationCard/fetchKladrStreets',
  async (payload: { id: string; type?: KladrDocType,value?:string }, thunkAPI) => {
    thunkAPI.dispatch(
      setKladrStreetsLoading({ value: true, type: payload.type }),
    );
    try {
      const response = await RbService.getRegionStreets(payload.id,payload.value);
      if (response.data) {
        const formattedData = response.data.map((item) => ({
          id: item.CODE,
          name: item.NAME,
          socr: item.SOCR,
          infis: item.infis,
        }));
        return { items: formattedData, type: payload.type };
      }
    } catch (e) {
      alert(e)
    } finally {
      thunkAPI.dispatch(
        setKladrStreetsLoading({ value: false, type: payload.type }),
      );
    }
  },
);

export const findPatientPolicy = createAsyncThunk(
  'registrationCard/findPatientPolicy',
  async (
    payload: FindPolicyParams,
    thunkAPI,
  ) => {
    thunkAPI.dispatch(
      setFindPolicyLoading(true),
    );
    try {
      //@ts-ignore
      const birthDate = format(parseISO(payload.birthDate), 'yyyy-MM-dd');
      const response = await PatientsService.findPatientPolicy({
        ...payload,
        birthDate,
      });
      thunkAPI.dispatch(
        setFindPolicyLoading(false),
      );
      if (response.status === 200) {
        thunkAPI.dispatch(
          setPoliciesFoundMessage(true),
        );
        return response.data;
      } else if (response.status === 204) {
        thunkAPI.dispatch(
          setPoliciesFoundMessage(true),
        );
        return {};
      }
    } catch (e) {
      alert(e)
    }
  },
);

export const saveCardPatient = createAsyncThunk(
  'registrationCard/saveCardPatient',
  async (_, thunkAPI) => {
    thunkAPI.dispatch(setLoading({ type: 'saveNewPatient', value: true }));
    try {
      const state = thunkAPI.getState() as RootState;
      const payload = getSaveRegCardPayload(state);
      console.log('payload', payload);
      const response = await PatientsService.savePatient(payload);
      const responceData: PatientAddedResponse = response.data;
      const patientId = responceData.last_insert_id;
      thunkAPI.dispatch(setPatientReg({ type: 'setPatientReg', value: patientId }));
    } catch (e) {
      alert(JSON.stringify(e.response.data));
    } finally {
      thunkAPI.dispatch(setLoading({ type: 'saveNewPatient', value: false }));
    }
  },
);

export const editCardPatient = createAsyncThunk(
  'registrationCard/saveCardPatient',
  async (_, thunkAPI) => {
    thunkAPI.dispatch(setLoading({ type: 'saveNewPatient', value: true }));
    try {
      const state = thunkAPI.getState() as RootState;
      const payload = getSaveRegCardPayload(state);
      console.log('payload', payload);
      const response = await PatientsService.editPatient(payload);
      const responceData: PatientAddedResponse = response.data;
      const patientId = responceData.last_insert_id;
      thunkAPI.dispatch(setPatientReg({ type: 'setPatientReg', value: patientId }));
    } catch (e) {
      alert(JSON.stringify(e.response.data));
    } finally {
      thunkAPI.dispatch(setLoading({ type: 'saveNewPatient', value: false }));
    }
  },
);

const registrationCardSlice = createSlice({
  name: 'registrationCard',
  initialState: initialState,
  reducers: {
    setFormSection: (state, action: PayloadAction<WizardStateType>) => {
      state.form = { ...state.form, ...action.payload };
    },
    setDocumentedBuffer: (
      state,
      action: PayloadAction<{
        value: PassportAddressType;
        type: 'setDocumentedBuffer';
      }>,
    ) => {
      state.form.data.passportGeneral.documentedAddress.documentedBuffer =
        action.payload.value;
    },
    setPatientReg: (
      state,
      action: PayloadAction<{
        value: number;
        type: 'setPatientReg'
      }>
    ) => {
      state.patientRegId = action.payload.value;
    },
    setLoading: (
      state,
      action: PayloadAction<{
        value: boolean;
        type: 'saveNewPatient' | 'idPatient';
      }>,
    ) => {
      state.loading[action.payload.type] = action.payload.value;
    },
    setFindPolicyLoading: (
      state,
      action: PayloadAction<boolean>,
    ) => {
      state.form.foundPolicies.oms.isLoading =
        action.payload;
    },
    setPoliciesFoundMessage: (
      state,
      action: PayloadAction<boolean>
    ) => {
      state.policiesFoundMessage = action.payload;
    },
    setKladrLoading: (
      state,
      action: PayloadAction<{ value: boolean; type?: KladrDocType }>,
    ) => {
      if (action.payload.type === 'documented') {
        state.form.data.passportGeneral.documentedAddress.isKladrLoading =
          action.payload.value;
      } else {
        state.form.data.passportGeneral.addressRegistration.isKladrLoading =
          action.payload.value;
      }
    },
    setKladrNestedLoading: (
      state,
      action: PayloadAction<{ value: boolean; type?: KladrDocType }>,
    ) => {
      if (action.payload.type === 'documented') {
        state.form.data.passportGeneral.documentedAddress.isKladrNestedLoading =
          action.payload.value;
      } else {
        state.form.data.passportGeneral.addressRegistration.isKladrNestedLoading =
          action.payload.value;
      }
    },
    setKladrStreetsLoading: (
      state,
      action: PayloadAction<{ value: boolean; type?: KladrDocType }>,
    ) => {
      if (action.payload.type === 'documented') {
        state.form.data.passportGeneral.documentedAddress.isKladrStreetsLoading =
          action.payload.value;
      } else {
        state.form.data.passportGeneral.addressRegistration.isKladrStreetsLoading =
          action.payload.value;
      }
    },
    fetchIdPatientError: (state) => {
      state.form = { ...initialState.form };
      state.initialFormState = { ...initialState.initialFormState };
    },
    resetRegCard: (state) => {
      const {data: initialData, ...stateWithoutData} = initialState.form
      state.form = {...state.form, ...stateWithoutData};
      state.initialFormState = { ...initialState.initialFormState };
    },
    resetPoliciesFound: (state) => {
      //@ts-ignore
      state.form.foundPolicies.oms.items[0] = state.initialFormState.passportGeneral.policyOms;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchIdPatient.fulfilled, (state, action) => {
      if (action.payload && action.payload.length > 0) {
        const transformedPatient = transformPatientResponse(action.payload[0]);
        // console.log('BIRTH DATE', transformedPatient.birthDate);
        const dmsFound = transformedPatient.policy.filter(
          (item) => parseInt(item.type) === 3,
        );
        const omsFound = transformedPatient.policy.filter(
          (item) => parseInt(item.type) !== 3,
        );
        state.initialFormState.personal = {
          ...state.form.personal,
          code: transformedPatient.code.toString(),
          firstName: action.payload[0].firstName,
          lastName: action.payload[0].lastName,
          patrName: action.payload[0].patrName,
          sex: transformedPatient.sex === 2 ? 1 : 0,
          birthDate: transformedPatient.birthDate,
          birthPlace: transformedPatient.birthPlace,
          height: transformedPatient.growth,
          weight: transformedPatient.weight,
          snils: transformedPatient.snils,
          startCardDate: transformedPatient.chartBeginDate
        };
        // @ts-ignore
        state.initialFormState.passportGeneral.passportInfo = {
          ...(transformedPatient.address.length > 0) ? {
            addressRegistration: {
              id: transformedPatient.address[0].address.id,
              isKLADR: Boolean(!transformedPatient.address[0].freeInput),
              city: state.form.passportGeneral.passportInfo.addressRegistration.city,
              area: transformedPatient.address[0].address.KLADRCode,
              street: transformedPatient.address[0].address.KLADRStreetCode,
              houseNumber: transformedPatient.address[0].address.house,
              houseCharacter: transformedPatient.address[0].address.litera,
              flatNumber: transformedPatient.address[0].address.flat,
              isDocumentedAddress: Boolean(
                transformedPatient.address[0]?.addressId ===
                transformedPatient.address[1]?.addressId,
              ),
              freeInput: transformedPatient.address[0].freeInput,
            },
            documentedAddress: {
              id: transformedPatient.address[1].address.id,
              isKLADR: Boolean(!transformedPatient.address[1]?.freeInput),
              city: state.form.passportGeneral.passportInfo.addressRegistration.city,
              area: transformedPatient.address[1]?.address.KLADRCode,
              street: transformedPatient.address[1]?.address.KLADRStreetCode,
              houseNumber: transformedPatient.address[1]?.address.house,
              houseCharacter: transformedPatient.address[1]?.address.litera,
              flatNumber: transformedPatient.address[1]?.address.flat,
              isDocumentedAddress: Boolean(
                transformedPatient.address[0]?.addressId ===
                transformedPatient.address[1]?.addressId,
              ),
              freeInput: transformedPatient.address[1]?.freeInput,
            }
          } : {
            addressRegistration: {
              ...initialState.initialFormState.passportGeneral.passportInfo.addressRegistration
            },
            documentedAddress: {
              ...initialState.initialFormState.passportGeneral.passportInfo.documentedAddress
            }
          },
          ...transformedPatient.client_document_info,
          serialFirst: transformedPatient.client_document_info
            ? transformedPatient.client_document_info.serial.substr(0,2)
            : '',
          serialSecond: transformedPatient.client_document_info
            ? transformedPatient.client_document_info.serial.substr(2)
            : '',
        };
        // @ts-ignore
        // state.form.foundPolicies.dms.items = [dmsFound[dmsFound.length - 1]];
        // @ts-ignore
        // state.form.foundPolicies.oms.items = [omsFound[omsFound.length - 1]];
        state.initialFormState.passportGeneral.policyDms =
          dmsFound.length > 0
            ? dmsFound[dmsFound.length - 1]
            : state.initialFormState.passportGeneral.policyDms;
        state.initialFormState.passportGeneral.policyOms =
          omsFound.length > 0
            ? omsFound[omsFound.length - 1]
            : state.initialFormState.passportGeneral.policyOms;
        state.initialFormState.socialStatus.socialStatus =
          transformedPatient.socialStatus.map((item) => ({
            statusId: item.id,
            note: item.note,
            class: item.class,
            statusType: item.type,
            fromDate: item.fromDate,
            endDate: item.endDate,
            deleted: item.deleted,
            docId: item.document ? item.document.id : undefined,
            serialFirst: item.document && item.document.serial
              ? item.document.serial?.substring(0, item.document.serial.length/2)
              : undefined,
            serialSecond: item.document && item.document.serial
              ? item.document.serial.substring(item.document.serial.length/2, item.document.serial.length)
              : undefined,
            number: item.document ? item.document.number : undefined,
            date: item.document ? item.document.date : undefined,
            givenBy: item.document ? item.document.origin : undefined,
          }));
          // @ts-ignore
        state.initialFormState.socialStatus.trustedDoc =
          transformedPatient.socialStatus.map((item) => (
            item.document ? {
              id: item.id,
              docType: item.document.id && item.document.id.toString(),
              serialFirst: item.document.serial && item.document.serial.substring(0, item.document.serial.length/2),
              serialSecond: item.document.serial && item.document.serial.substring(item.document.serial.length/2, item.document.serial.length),
              number: item.document.number,
              date: item.document.date,
              givenBy: item.document.origin,
            } : {}
          ));
          // @ts-ignore
        state.initialFormState.employment.employment = transformedPatient.work.map(
          (item) => ({
            id: item.id,
            organization: item.id ? item.id.toString() : item.freeInput,
            position: item.post,
            experience: item.stage,
            deleted: item.deleted,
          })
        );
        //@ts-ignore
        state.initialFormState.employment.hazardHistory = transformedPatient.work.map(
          (item, index) => (item.client_work_hurt_info && item.client_work_hurt_factor_info && {
            id: item.id,
            hazardDescription: item.client_work_hurt_info.length > 0 ? item.client_work_hurt_info[index].hurtTypeId.toString() : '',
            hazardExp: item.client_work_hurt_info.length > 0 ? item.client_work_hurt_info[index].stage : 0,
            factor: item.client_work_hurt_factor_info.length > 0 ? item.client_work_hurt_factor_info[index].factorTypeId.toString() : ''
          })
        );
        state.initialFormState.passportGeneral.contacts.contacts = transformedPatient.contacts.map(
          (item) => ({
            id: item.id,
            isMain: item.isPrimary === 1,
            number: item.contact,
            type: item.contactTypeId.toString(),
            note: item.note,
            deleted: 0,
          }),
        );
        state.initialFormState.attachments.attachments = transformedPatient.attachments.map(
          (item) => ({
            id: item.id,
            type: item.type.toString(),
            lpu: item.lpu.toString(),
            unit: item.unit.toString(),
            fromDate: item.fromDate || '',
            endDate: item.endDate || '',
            detachmentReason: item.detachmentReason?.toString() || '',
            deleted: 0,
          })
        )
        state.initialFormState.passportGeneral.passportInfo.documentedAddress.area =
          transformedPatient.address[0]?.address.KLADRCode || '';
        state.initialFormState.passportGeneral.passportInfo.addressRegistration.area =
          transformedPatient.address[1]?.address.KLADRCode || '';
        state.initialFormState.outsideIdentification.outsideIds = transformedPatient.outsideIds.map(
          (item) => ({
            id: item.id,
            outsideSchema: item.outsideSchema.toString(),
            idRef: item.idRef,
            date: new Date(item.date),
            deleted: item.deleted,
          })
        );
      }
    });
    builder.addCase(fetchKladr.fulfilled, (state, action) => {
      if (action.payload?.type === 'documented' && action.payload.items) {
        state.form.data.passportGeneral.documentedAddress = {
          ...state.form.data.passportGeneral.documentedAddress,
          kladr: action.payload.items,
          kladrNested: [],
          kladrStreets: [],
        };
      } else if (
        action.payload?.type === 'registration' &&
        action.payload.items
      ) {
        state.form.data.passportGeneral.addressRegistration = {
          ...state.form.data.passportGeneral.addressRegistration,
          kladr: action.payload.items,
          kladrNested: [],
          kladrStreets: [],
        };
      } else if (action.payload?.items) {
        state.form.data.passportGeneral.documentedAddress = {
          ...state.form.data.passportGeneral.documentedAddress,
          kladr: action.payload.items,
        };
        state.form.data.passportGeneral.addressRegistration = {
          ...state.form.data.passportGeneral.addressRegistration,
          kladr: action.payload.items,
        };
      }
    });
    builder.addCase(fetchKladrStreets.fulfilled, (state, action) => {
      if (action.payload?.type === 'documented' && action.payload.items) {
        state.form.data.passportGeneral.documentedAddress.kladrStreets =
          action.payload.items;
      } else if (
        action.payload?.type === 'registration' &&
        action.payload.items
      ) {
        state.form.data.passportGeneral.addressRegistration.kladrStreets =
          action.payload.items;
      }
    });
    builder.addCase(fetchKladrNested.fulfilled, (state, action) => {
      if (action.payload?.type === 'documented' && action.payload.items) {
        state.form.data.passportGeneral.documentedAddress = {
          ...state.form.data.passportGeneral.documentedAddress,
          kladrNested: action.payload.items,
          kladrStreets: [],
        };
      } else if (
        action.payload?.type === 'registration' &&
        action.payload.items
      ) {
        state.form.data.passportGeneral.addressRegistration = {
          ...state.form.data.passportGeneral.addressRegistration,
          kladrNested: action.payload.items,
          kladrStreets: [],
        };
      }
    });
    builder.addCase(findPatientPolicy.fulfilled, (state, action) => {
      if (action.payload) {
        // @ts-ignore
        state.form.foundPolicies.oms.items =
          Object.keys(action.payload).length !== 0 && action.payload.constructor === Object ? [
          // @ts-ignore
          transformPolicySearchResponse(action.payload),
        ] : [];
      }
    });
  },
});

export const {
  setFormSection,
  setKladrLoading,
  setKladrNestedLoading,
  setKladrStreetsLoading,
  setFindPolicyLoading,
  setLoading,
  setDocumentedBuffer,
  fetchIdPatientError,
  setPatientReg,
  resetRegCard,
  resetPoliciesFound,
  setPoliciesFoundMessage,
} = registrationCardSlice.actions;

export default registrationCardSlice;
