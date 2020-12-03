import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

import initialState from './initialState';
import RbService from '../../../services/RbService';
import FindPolicyParams from '../../../interfaces/payloads/patients/findPatientPolicy';
import PatientsService from '../../../services/PatientsService/PatientsService';
import transformPolicyResponse from '../../utils/transform/transformPolicyResponse';
import { WizardStateType } from '../../../components/forms/wizards/RegCardWizard/types';
import { RootState } from '../../store';
import NewPatientPayload from '../../../interfaces/payloads/patients/newPatient';
import { KladrDocType } from './types';
import { transformPatientResponse } from '../../utils/transform/transformPatientResponse';
import {PassportAddressType} from "../../../components/forms/wizards/RegCardWizard/pages/PassportGeneral/types";

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
    } finally {
      thunkAPI.dispatch(setKladrLoading({ value: false, type: payload.type }));
    }
  },
);

export const fetchKladrNested = createAsyncThunk(
  'registrationCard/fetchKladrNested',
  async (payload: { id: string; type?: KladrDocType }, thunkAPI) => {
    thunkAPI.dispatch(
      setKladrNestedLoading({ value: true, type: payload.type }),
    );
    try {
      const response = await RbService.getRegionList(payload.id);
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
    } finally {
      thunkAPI.dispatch(
        setKladrNestedLoading({ value: false, type: payload.type }),
      );
    }
  },
);

export const fetchKladrStreets = createAsyncThunk(
  'registrationCard/fetchKladrStreets',
  async (payload: { id: string; type?: KladrDocType }, thunkAPI) => {
    thunkAPI.dispatch(
      setKladrStreetsLoading({ value: true, type: payload.type }),
    );
    try {
      const response = await RbService.getRegionStreets(payload.id);
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
    payload: { params: FindPolicyParams; type: 'oms' | 'dms' },
    thunkAPI,
  ) => {
    thunkAPI.dispatch(
      setFindPolicyLoading({ value: true, type: payload.type }),
    );
    try {
      const response = await PatientsService.findPatientPolicy(payload.params);
      thunkAPI.dispatch(
        setFindPolicyLoading({ value: false, type: payload.type }),
      );
      return {
        data: response,
        type: payload.type,
      };
    } catch (e) {}
  },
);

export const saveCardPatient = createAsyncThunk(
  'registrationCard/saveCardPatient',
  async (_, thunkAPI) => {
    thunkAPI.dispatch(setLoading({ type: 'saveNewPatient', value: true }));
    try {
      const state = thunkAPI.getState() as RootState;
      const {
        passportType,
        serialFirst,
        serialSecond,
        number,
        fromDate,
        givenBy,
        addressRegistration,
        documentedAddress,
      } = state.registrationCard.form.passportGeneral.passportInfo;
      const {
        policyDms,
        policyOms,
      } = state.registrationCard.form.passportGeneral;
      const {
        firstName,
        lastName,
        patrName,
        birthPlace,
        birthDate,
        birthTime,
        sex,
        snils,
        weight,
        height,
        hasImplants,
        hasProsthesis,
        docPersonId,
        startCardDate,
        hasCard,
        onlyTempRegistration
      } = state.registrationCard.form.personal;
      // const {} =
      const payload: NewPatientPayload = {
        firstName,
        lastName,
        patrName,
        birthPlace,
        birthDate,
        birthTime,
        hasImplants,
        hasProsthesis,
        docPersonId,
        startCardDate,
        hasCard,
        onlyTempRegistration,
        sex: sex === 0 ? 1 : 2,
        SNILS: snils,
        weight: weight.toString(),
        growth: height.toString(),

        client_document_info: [
          {
            documentType_id: passportType,
            serial: serialFirst.concat(serialSecond),
            number,
            date: fromDate,
            origin: givenBy,
            endDate: '2200-12-12',
          }
        ],

        client_contact_info: state.registrationCard.form.passportGeneral.contacts.map((item) => ({
          contactType_id: parseInt(item.type),
          contact: item.number,
          isPrimary: item.isMain ? 1 : 0,
          notes: item.note
        })),

        client_policy_info:
          policyDms.concat(policyOms).map((item) => ({
            ...(item.id) && {id: item.id},
            insurer_id: parseInt(item.cmo),
            policyType_id: item.type ? parseInt(item.type) : null,
            policyKind_id: item.timeType ? parseInt(item.timeType) : null,
            begDate: item.from,
            endDate: item.to,
            note: item.note,
            name: item.name,
            number: item.number,
            serial: item.serial,
          })) || [],

        client_address_info: [
          {
            address: {
              address_house: {
                KLADRCode: (addressRegistration.area === '7800000000000'
                  || addressRegistration.area === '7700000000000'
                  || addressRegistration.area === '9200000000000')
                  ? addressRegistration.area
                  : addressRegistration.city,
                KLADRStreetCode: addressRegistration.street,
                number: addressRegistration.houseNumber?.toString() || '',
                corpus: '',
                litera: addressRegistration.houseCharacter?.toString() || '',
              },
              flat: addressRegistration.flatNumber?.toString() || '',
            },
            isVillager: +!addressRegistration.isKLADR,
            type: 0,
          },
          {
            address: {
              address_house: {
                KLADRCode: (documentedAddress.area === '7800000000000'
                  || documentedAddress.area === '7700000000000'
                  || documentedAddress.area === '9200000000000')
                  ? documentedAddress.area
                  : documentedAddress.city,
                KLADRStreetCode: documentedAddress.street,
                corpus: documentedAddress.houseCharacter?.toString() || '',
                litera: '',
                number: documentedAddress.houseNumber?.toString() || '',
              },
              flat: documentedAddress.flatNumber?.toString() || '',
            },
            isVillager: +!documentedAddress.isKLADR,
            type: 1,
          },
        ],

        ...(state.registrationCard.form.socialStatus.socialStatus.length > 0) && {
          social_status_info:
            state.registrationCard.form.socialStatus.socialStatus.map((item) => ({
              type: item.type ? parseInt(item.type) : null,
              class: item.class ? parseInt(item.class) : null,
              begDate: item.fromDate,
              endDate: item.endDate,
              notes: item.note ?? null,
            })),
        },
        ...(state.registrationCard.form.attachments.attachments.length > 0) && {
          client_attachments: state.registrationCard.form.attachments.attachments.map(
            (item) => item,
          ),
        },
        ...(state.registrationCard.form.employment.employment.length > 0) && {
          client_employment: state.registrationCard.form.employment.employment.map(
            (item) => item,
          ),
        },
        ...(state.registrationCard.form.employment.hazardHistory.length > 0) && {
          client_hazard: state.registrationCard.form.employment.hazardHistory.map(
            (item) => item,
          ),
        },
        ...(state.registrationCard.form.viewTypes.viewTypes.length > 0) && {
          client_view_types: state.registrationCard.form.viewTypes.viewTypes.map(
            (item) => item,
          ),
        },
        ...(state.registrationCard.form.features.features.length > 0) && {
          client_features: state.registrationCard.form.features.features.map(
            (item) => item,
          ),
        },
        ...(state.registrationCard.form.features.allergy.length > 0) && {
          client_allergy: state.registrationCard.form.features.allergy.map(
            (item) => item,
          ),
        },
        ...(state.registrationCard.form.features.medIntolerance.length > 0) && {
          client_med_intolerance: state.registrationCard.form.features.medIntolerance.map(
            (item) => item,
          ),
        },
        ...(state.registrationCard.form.features.inspections.length > 0) && {
          client_inspections: state.registrationCard.form.features.inspections.map(
            (item) => item,
          ),
        },
        ...(state.registrationCard.form.features.anthropometricDate.length > 0) && {
          client_anthropometric: state.registrationCard.form.features.anthropometricDate.map(
            (item) => item,
          ),
        },
        ...(state.registrationCard.form.privileges.privileges.length > 0) && {
          client_privileges: state.registrationCard.form.privileges.privileges.map(
            (item) => item,
          ),
        },
        ...(state.registrationCard.form.privileges.invalidity.length > 0) && {
          client_invalidity: state.registrationCard.form.privileges.invalidity.map(
            (item) => item,
          ),
        },
        ...(state.registrationCard.form.offences.offences.length > 0) && {
          client_offences: state.registrationCard.form.offences.offences.map(
            (item) => item,
          ),
        },
        ...(state.registrationCard.form.additionalHospitalization.hospitalizations.length > 0) && {
          client_additional_hospitalization: state.registrationCard.form.additionalHospitalization.hospitalizations.map(
            (item) => item,
          ),
        },
        ...(state.registrationCard.form.outsideHospitalization.outsideHospitalization.length > 0) && {
          client_outside_hospitalization: state.registrationCard.form.outsideHospitalization.outsideHospitalization.map(
            (item) => item,
          ),
        },
        ...(state.registrationCard.form.outsideIdentification.outsideIds.length > 0) && {
          client_outside_identification: state.registrationCard.form.outsideIdentification.outsideIds.map(
            (item) => item,
          ),
        },
        ...(state.registrationCard.form.etc.items.length > 0) && {
          client_etc: state.registrationCard.form.etc.items.map(
            (item) => item,
          ),
        },
        ...(state.registrationCard.form.personDocs.idDoc.length > 0) && {
          client_id_doc: state.registrationCard.form.personDocs.idDoc.map(
            (item) => item,
          ),
        },
        ...(state.registrationCard.form.personDocs.policy.length > 0) && {
          client_policy: state.registrationCard.form.personDocs.policy.map(
            (item) => item,
          ),
        },
        ...(state.registrationCard.form.personDocs.socialStatus.length > 0) && {
          client_social_status: state.registrationCard.form.personDocs.socialStatus.map(
            (item) => item,
          ),
        },
        ...(state.registrationCard.form.personDocs.namedDoc.length > 0) && {
          client_named_doc: state.registrationCard.form.personDocs.namedDoc.map(
            (item) => item,
          ),
        },
      };
      console.log('payload', payload);
      await PatientsService.savePatient(payload);
    } catch (e) {
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
      action: PayloadAction<{ value: boolean; type: 'oms' | 'dms' }>,
    ) => {
      state.form.foundPolicies[action.payload.type].isLoading =
        action.payload.value;
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
      state.form = { ...initialState.form };
      state.initialFormState = { ...initialState.initialFormState };
    }
  },
  extraReducers: (builder) => {
    builder.addCase(fetchIdPatient.fulfilled, (state, action) => {
      if (action.payload && action.payload.length > 0) {
        const transformedPatient = transformPatientResponse(action.payload[0]);
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
          snils: transformedPatient.snils,
          startCardDate: transformedPatient.chartBeginDate
        };
        state.initialFormState.passportGeneral.passportInfo = {
          ...(transformedPatient.address.length > 0) ? {
            addressRegistration: {
              isKLADR: Boolean(!transformedPatient.address[0].freeInput),
              city:
              state.form.passportGeneral.passportInfo.addressRegistration.city,
              area: transformedPatient.address[0].address.KLADRCode,
              street: transformedPatient.address[0].address.KLADRStreetCode,
              houseNumber: transformedPatient.address[0].address.house,
              houseCharacter: transformedPatient.address[0].address.corpus,
              flatNumber: transformedPatient.address[0].address.flat,
              isDocumentedAddress: Boolean(
                transformedPatient.address[0]?.addressId ===
                transformedPatient.address[1]?.addressId,
              ),
              freeInput: transformedPatient.address[0].freeInput,
            },
            documentedAddress: {
              isKLADR: Boolean(!transformedPatient.address[1]?.freeInput),
              city:
              state.form.passportGeneral.passportInfo.addressRegistration.city,
              area: transformedPatient.address[1]?.address.KLADRCode,
              street: transformedPatient.address[1]?.address.KLADRStreetCode,
              houseNumber: transformedPatient.address[1]?.address.house,
              houseCharacter: transformedPatient.address[1]?.address.corpus,
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
          serialFirst: transformedPatient.client_document_info.serial.substr(0,1),
          serialSecond: transformedPatient.client_document_info.serial.substr(2),
        };
        state.form.foundPolicies.dms.items = [dmsFound[dmsFound.length - 1]];
        state.form.foundPolicies.oms.items = [omsFound[omsFound.length - 1]];
        state.initialFormState.passportGeneral.policyDms =
          dmsFound.length > 0 ? [dmsFound[dmsFound.length - 1]] : [];
        state.initialFormState.passportGeneral.policyOms =
          omsFound.length > 0 ? [omsFound[omsFound.length - 1]] : [];
        state.initialFormState.socialStatus.socialStatus =
          transformedPatient.socialStatus.map((item) => ({
            id: item.id,
            serialNumber: item.serialNumber,
            number: item.number,
            note: item.note,
            class: item.class,
            type: item.type,
            fromDate: item.fromDate,
            endDate: item.endDate,
          }));
        state.initialFormState.socialStatus.trustedDoc =
          transformedPatient.socialStatus.map((item) => ({
            type: item.document.id.toString(),
            serial: item.document.serial,
            number: item.document.number,
            date: item.document.date,
            givenBy: item.document.origin,
          }));
        state.initialFormState.employment.employment = transformedPatient.work.map(
          (item) => ({
            organization: item.id ? item.id.toString() : item.freeInput,
            position: item.post,
            experience: item.stage
          })
        );
        state.initialFormState.employment.hazardHistory = transformedPatient.work.map(
          (item, index) => ({
            hazardDescription: item.client_work_hurt_info.length > 0 ? item.client_work_hurt_info[index].hurtTypeId.toString() : '',
            exp: item.client_work_hurt_info.length > 0 ? item.client_work_hurt_info[index].stage : 0
          })
        );
        state.initialFormState.passportGeneral.contacts = transformedPatient.contacts.map(
          (item) => ({
            isMain: item.isPrimary === 1,
            number: item.contact,
            type: item.contactTypeId.toString(),
            note: item.note,
          }),
        );
        state.initialFormState.passportGeneral.passportInfo.documentedAddress.area =
          transformedPatient.address[0]?.address.KLADRCode || '';
        state.initialFormState.passportGeneral.passportInfo.addressRegistration.area =
          transformedPatient.address[1]?.address.KLADRCode || '';
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
      if (action.payload && action.payload.type === 'oms') {
        state.form.foundPolicies.oms.items = [
          transformPolicyResponse(action.payload.data),
        ];
      } else if (action.payload?.type === 'dms') {
        state.form.foundPolicies.dms.items = [
          transformPolicyResponse(action.payload.data),
        ];
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
  resetRegCard
} = registrationCardSlice.actions;

export default registrationCardSlice;
