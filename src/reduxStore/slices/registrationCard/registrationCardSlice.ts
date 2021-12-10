import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import {format, parseISO} from "date-fns";

import initialState from './initialState';
import RbService from '../../../services/RbService';
import FindPolicyParams from '../../../interfaces/payloads/patients/findPatientPolicy';
import FindDocParams from "../../../interfaces/payloads/patients/findPatientDoc";
import PatientsService from '../../../services/PatientsService/PatientsService';
import transformPolicySearchResponse from "../../utils/transform/transformPolicySearchResponse";
import { WizardStateType } from '../../../components/forms/wizards/RegCardWizard/types';
import { RootState } from '../../store';
import { KladrDocType } from './types';
import { transformPatientResponse } from '../../utils/transform/transformPatientResponse';
import {
  PassportAddressType,
  PassportPolicyType
} from "../../../components/forms/wizards/RegCardWizard/pages/PassportGeneral/types";
import {getSaveRegCardPayload} from "../../../utils/getSaveRegCardPayload";
import PatientAddedResponse from "../../../interfaces/responses/patients/patientAdded";
import {PersonLink} from "../../../components/forms/PersonLinksForm/types";
import {getRandomNumberId} from "../../../utils/getRandomNumberId";

export const fetchIdPatient = createAsyncThunk(
  `patients/fetchIdPatient`,
  async (id: number, thunkAPI) => {
    thunkAPI.dispatch(setLoading({ type: 'idPatient', value: true }));
    const state = thunkAPI.getState() as RootState;
    try {
      const response = await PatientsService.fetchIdPatient(id, state.auth.token);
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
      const response = await RbService.getRegionList(payload.id,payload.value || '');
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
      const response = await RbService.getRegionStreets(payload.id,payload.value || '');
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
    const state = thunkAPI.getState() as RootState;
    thunkAPI.dispatch(
      setFindPolicyLoading(true),
    );
    try {
      const birthDate = typeof payload.birthDate === 'string'
        ? format(parseISO(payload.birthDate), 'yyyy-MM-dd')
        //@ts-ignore
        : format(payload.birthDate, 'yyyy-MM-dd');
      const response = await PatientsService.findPatientPolicy(
        {
          ...payload,
          birthDate
        },
        state.auth.token,
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
      alert(e);
      thunkAPI.dispatch(
        setFindPolicyLoading(false),
      );
    } finally {
      thunkAPI.dispatch(
        setFindPolicyLoading(false),
      );
    }
  },
);

export const findPatientDoc = createAsyncThunk(
  'registrationCard/findPatientDoc',
  async (
    payload: FindDocParams,
    thunkAPI,
  ) => {
    const state = thunkAPI.getState() as RootState;
    thunkAPI.dispatch(
      setFindDocLoading(true),
    );
    try {
      const response = await PatientsService.findPatientDoc(payload, state.auth.token);
      if (response.status === 200) {
        thunkAPI.dispatch(
          setDocFoundMessage(true),
        );
        if (response.data.documents) {
          return response.data;
        } else {
          return null;
        }
      }
    } catch (e) {
      alert(e);
      thunkAPI.dispatch(
        setFindDocLoading(false),
      );
    } finally {
      thunkAPI.dispatch(
        setFindDocLoading(false),
      );
    }
  },
);

export const saveCardPatient = createAsyncThunk(
  'registrationCard/saveCardPatient',
  async (_, thunkAPI) => {
    const state = thunkAPI.getState() as RootState;
    thunkAPI.dispatch(setLoading({ type: 'saveNewPatient', value: true }));
    try {
      const state = thunkAPI.getState() as RootState;
      const payload = getSaveRegCardPayload(state);
      console.log('payload', payload);
      const response = await PatientsService.savePatient(payload, state.auth.token);
      const responceData: PatientAddedResponse = response.data;
      const patientId = responceData.last_insert_id;
      thunkAPI.dispatch(setPatientReg({ type: 'setPatientReg', value: patientId }));
      window.top.postMessage(JSON.stringify({action:'closeDialog', clientId: patientId}),'*');
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
    const state = thunkAPI.getState() as RootState;
    thunkAPI.dispatch(setLoading({ type: 'saveNewPatient', value: true }));
    try {
      const state = thunkAPI.getState() as RootState;
      const payload = getSaveRegCardPayload(state);
      console.log('payload', payload);
      const response = await PatientsService.editPatient(payload, state.auth.token);
      const responceData: PatientAddedResponse = response.data;
      const patientId = responceData.last_insert_id;
      thunkAPI.dispatch(setPatientReg({ type: 'setPatientReg', value: patientId }));
      window.top.postMessage(JSON.stringify({action:'closeDialog', clientId: patientId}),'*');
    } catch (e) {
      console.log(e)
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
    setPolicyBuffer: (
      state,
      action: PayloadAction<{
        value: PassportPolicyType;
        type: 'setPolicyBuffer';
      }>,
    ) => {
      state.form.policyBuffer = action.payload.value;
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
      state.form.foundPolicies.isLoading = action.payload;
    },
    setFindDocLoading: (
      state,
      action: PayloadAction<boolean>,
    ) => {
      state.form.foundDocs.isLoading = action.payload;
    },
    setPoliciesFoundMessage: (
      state,
      action: PayloadAction<boolean>
    ) => {
      state.policiesFoundMessage = action.payload;
    },
    setDocFoundMessage: (
      state,
      action: PayloadAction<boolean>
    ) => {
      state.docFoundMessage = action.payload;
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
      state.form.foundPolicies.item = state.form.policyBuffer;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchIdPatient.fulfilled, (state, action) => {
      if (action.payload && action.payload.length > 0) {
        const transformedPatient = transformPatientResponse(action.payload[0]);
        // console.log('transformedPatient', transformedPatient);
        const oms = transformedPatient.policy.filter(
          (item) => parseInt(item.type) !== 3,
        );
        const omsFound = oms[oms.length - 1];
        const documentInitial = {
          id: undefined,
          passportType: '',
          serialFirst: '',
          serialSecond: '',
          number: '',
          fromDate: '',
          givenBy: '',
        };
        const policyInitial = {
          id: undefined,
          cmoArea: '7800000000000',
          cmo: "",
          from: '',
          name: "",
          note: "",
          number: "",
          serial: "",
          timeType: "",
          to: '',
          type: '',
          deleted: 0,
          enp: '',
          inn: '',
          ogrn: '',
          infisCode: '',
          smoShort: '',
          cancelReason: '',
        };
        state.initialFormState.personal = {
          ...state.form.personal,
          code: transformedPatient.code.toString(),
          firstName: action.payload[0].firstName,
          lastName: action.payload[0].lastName,
          patrName: action.payload[0].patrName,
          sex: transformedPatient.sex === 2
                ? 1
                : transformedPatient.sex === 1 ? 0 : null,
          birthDate: transformedPatient.birthDate,
          birthPlace: transformedPatient.birthPlace,
          birthTime: transformedPatient.birthTime || '',
          height: transformedPatient.growth as number,
          weight: transformedPatient.weight as number,
          snils: transformedPatient.snils,
          SNILSMissingReason: transformedPatient.SNILSMissingReason,
          isShiftWorker: Boolean(transformedPatient.isShiftWorker),
        };
        // @ts-ignore
        state.initialFormState.passportGeneral.passportInfo = {
          ...(transformedPatient.address.length > 0) ? {
            addressRegistration: {
              id: transformedPatient.address[0].id,
              addressId: transformedPatient.address[0].addressId,
              addressHouseId: transformedPatient.address[0].address.addressHouseId,
              isKLADR: Boolean(!transformedPatient.address[0].freeInput),
              city: transformedPatient.address[0].address.KLADRCode,
              area: transformedPatient.address[0].address.KLADRRegionCode,
              street: transformedPatient.address[0].address.KLADRStreetCode,
              houseId: transformedPatient.address[0].address.houseId,
              houseNumber: transformedPatient.address[0].address.house,
              houseCharacter: transformedPatient.address[0].address.litera,
              flatNumber: transformedPatient.address[0].address.flat,
              isDocumentedAddress:
                transformedPatient.address[0]?.addressId
                  && transformedPatient.address[1]?.addressId
                  && Boolean(
                    transformedPatient.address[0]?.addressId ===
                    transformedPatient.address[1]?.addressId,
                  ),
              freeInput: transformedPatient.address[0].freeInput,
              isVillager: Boolean(transformedPatient.address[0].isVillager),
            },
            documentedAddress: transformedPatient.address[1] ? {
              id: transformedPatient.address[1].id,
              addressId: transformedPatient.address[1].addressId,
              addressHouseId: transformedPatient.address[1].address.addressHouseId,
              isKLADR: Boolean(!transformedPatient.address[1]?.freeInput),
              city: transformedPatient.address[1].address.KLADRCode,
              area: transformedPatient.address[1].address.KLADRRegionCode,
              street: transformedPatient.address[1]?.address.KLADRStreetCode,
              houseId: transformedPatient.address[1].address.houseId,
              houseNumber: transformedPatient.address[1]?.address.house,
              houseCharacter: transformedPatient.address[1]?.address.litera,
              flatNumber: transformedPatient.address[1]?.address.flat,
              isDocumentedAddress:
                transformedPatient.address[0]?.addressId
                  && transformedPatient.address[1]?.addressId
                  && Boolean(
                      transformedPatient.address[0]?.addressId ===
                      transformedPatient.address[1]?.addressId,
                    ),
              freeInput: transformedPatient.address[1]?.freeInput,
              isVillager: Boolean(transformedPatient.address[1].isVillager),
            } : {
              id: undefined,
              isKLADR: true,
              city: '8600001400000',
              area: '8600000000000',
              street: '',
              houseNumber: '',
              houseCharacter: '',
              flatNumber: '',
              isDocumentedAddress: false,
              freeInput: '',
              isVillager: false,
            }
          } : {
            addressRegistration: {
              ...initialState.initialFormState.passportGeneral.passportInfo.addressRegistration
            },
            documentedAddress: {
              ...initialState.initialFormState.passportGeneral.passportInfo.documentedAddress
            }
          },
        };
        state.initialFormState.personDocs.documents = transformedPatient.documents.length > 0 ? transformedPatient.documents : [documentInitial];
        state.initialFormState.personDocs.documentsDeleted = [];
        // @ts-ignore
        state.initialFormState.personDocs.policies = [
          ...omsFound ? [omsFound] : [policyInitial],
        ];
        state.initialFormState.personDocs.policiesDeleted = [];
        // @ts-ignore
        state.initialFormState.socialStatus.socialStatus =
          transformedPatient.socialStatus.map((item) => ({
            id: item.id,
            note: item.note,
            class: item.class,
            statusType: item.type,
            fromDate: item.fromDate,
            endDate: item.endDate,
            deleted: 0,
            document: {
              id: item.document.id,
              passportType: item.document ? item.document.type?.toString() : '',
              serialFirst: item.document && item.document.serial
                ? item.document.serial?.substring(0, item.document.serial.length/2)
                : '',
              serialSecond: item.document && item.document.serial
                ? item.document.serial.substring(item.document.serial.length/2, item.document.serial.length)
                : '',
              number: item.document ? item.document.number : '',
              fromDate: item.document ? item.document.date : '',
              givenBy: item.document ? item.document.origin : '',
              deleted: 0,
            },
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
            lpu: item.lpu ? item.lpu.toString() : '',
            unit: item.unit,
            fromDate: item.fromDate || '',
            endDate: item.endDate || '',
            detachmentReason: item.detachmentReason?.toString() || '',
            doctorLPU: '',
            deleted: 0,
          })
        );
        state.initialFormState.links.directLinks.directLinks = transformedPatient.relations.reduce((res: PersonLink[], item) => {
            if (item.clientId === transformedPatient.code) {
              res.push({
                id: item.id,
                forwardRef: item.relativeId,
                refName: item.relativeName,
                patientLink: item.relativeTypeId ? item.relativeTypeId.toString() : '',
                deleted: 0
              });
            }
            return res
          }, []);
        state.initialFormState.links.backLinks.backLinks = transformedPatient.relations.reduce((res: PersonLink[], item) => {
          if (item.clientId !== transformedPatient.code) {
            res.push({
              id: item.id,
              forwardRef: item.relativeId,
              refName: item.relativeName,
              patientLink: item.relativeTypeId ? item.relativeTypeId.toString() : '',
              deleted: 0
            });
          }
          return res
        }, []);
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
          // kladrStreets: [],
        };
      } else if (
        action.payload?.type === 'registration' &&
        action.payload.items
      ) {
        state.form.data.passportGeneral.addressRegistration = {
          ...state.form.data.passportGeneral.addressRegistration,
          kladrNested: action.payload.items,
          // kladrStreets: [],
        };
      }
    });
    builder.addCase(findPatientPolicy.fulfilled, (state, action) => {
      if (action.payload) {
        //@ts-ignore
        state.form.foundPolicies.item =
          Object.keys(action.payload).length !== 0 && action.payload.constructor === Object
            //@ts-ignore
            ? transformPolicySearchResponse(action.payload)
            : null;
      }
    });
    builder.addCase(findPatientDoc.fulfilled, (state, action) => {
      if (action.payload) {
        state.form.foundDocs.items = action.payload.documents.map((item) => ({
          key: getRandomNumberId(8),
          ...item
        }));
      } else {
        state.form.foundDocs.items = []
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
  setFindDocLoading,
  setLoading,
  setDocumentedBuffer,
  setPolicyBuffer,
  fetchIdPatientError,
  setPatientReg,
  resetRegCard,
  resetPoliciesFound,
  setPoliciesFoundMessage,
  setDocFoundMessage,
} = registrationCardSlice.actions;

export default registrationCardSlice;
