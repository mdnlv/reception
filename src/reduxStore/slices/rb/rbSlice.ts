import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

import {get, set, del } from  '../../../services/IndexDbService';

import Person from '../../../types/data/Person';
import Organisation from '../../../types/data/Organisation';
import AttachType from '../../../types/data/AttachType';
import DetachmentReason from "../../../types/data/DetachmentReason";
import RbService from '../../../services/RbService';
import PolicyType from '../../../types/data/PolicyType';
import PolicyKind from '../../../types/data/PolicyKind';
import PatientContactType from '../../../types/data/PatientContactType';
import PatientDocumentType from '../../../types/data/PatientDocumentType';
import OrgStructure from "../../../types/data/OrgStructure";
import RbDocumentTypeResponse  from '../../../../src/interfaces/responses/rb/rbDocumentType'
import RelatiionsTypes from '../../../interfaces/responses/rb/rbRelationType'
import SNILSMissingReason from "../../../types/data/SNILSMissingReason";
import PolicyDischargeReason from "../../../types/data/PolicyDischargeReason";
import SocialType from '../../../types/data/SocialType';
import SocialClass from '../../../types/data/SocialClass';

export const fetchCheckSum = createAsyncThunk('rb/fetchCheckSum',
async (payload: { name:string }, thunkAPI) => {
  try {
    const response = await RbService.fetchGetCheckSum(payload.name);
    if (response.data) {
        return response.data
    }
  } catch (e) {
  } finally {
  }
});


export const fetchRbPersons = createAsyncThunk('rb/fetchPersons', async () => {
  try {
    const response = await RbService.fetchPersons();
    if (response.data) {
      return response.data.map((item) => ({
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
    }
  } catch (e) {
  } finally {
  }
});

export const fetchRbPersonsSearch = createAsyncThunk('rb/fetchPersonsSearch',
async (payload: { query:string }, thunkAPI) => {
  try {
    const response = await RbService.fetchPersonsFind(payload.query);
    if (response.data) {
      return response.data.map((item) => ({
        id: item.id,
        fullName: `${item.lastName} ${item.firstName} ${item.patrName}`,
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
    }
  } catch (e) {
  } finally {
  }
});

export const fetchRbRelationTypes = createAsyncThunk(
  'rb/fetchRelationTypes',
  async (payload: { sex:number }, thunkAPI) => {
    thunkAPI.dispatch(setLoading({ type: 'relationTypes', value: true }));
    try {
      const response = await RbService.fetchRelationTypes();
      if (response.data) {
        return response.data
      }
    } catch (e) {
      alert(e);
      thunkAPI.rejectWithValue(e);
    } finally {
      thunkAPI.dispatch(setLoading({ type: 'relationTypes', value: false }));
    }
  },
);


export const fetchRbOrganisations = createAsyncThunk(
  'rb/fetchOrganisations',
  async (arg, thunkAPI) => {
    const checksum  = await  thunkAPI.dispatch(fetchCheckSum({name:"Organisation"}))

      const currentCheckSum =  await get('OrganisationSum') || ''

      const isCheckSum = currentCheckSum === checksum.payload

     thunkAPI.dispatch(setLoading({ type: 'organisations', value: true }));
    try {
      const response = isCheckSum ? await get('Organisation'):  await RbService.fetchOrganisation()
      if (response.data) {
        if(!isCheckSum){
         await del('OrganisationSum')
         await del('Organisation')
         await set('OrganisationSum',checksum.payload)
         await set('Organisation',{data:response.data})
        }
        return response.data;
      }
    } catch (e) {
      alert(e);
      thunkAPI.rejectWithValue(e);
    } finally {
      thunkAPI.dispatch(setLoading({ type: 'organisations', value: false }));
    }
  },
);

export const fetchRbDocumentTypes = createAsyncThunk(
  'rb/fetchDocumentTypes',
  async (arg, thunkAPI) => {
    const checksum  = await  thunkAPI.dispatch(fetchCheckSum({name:"rbDocumentType"}))

    const currentCheckSum =  await get('rbDocumentTypeSum') || ''

    const isCheckSum = currentCheckSum === checksum.payload


    thunkAPI.dispatch(setLoading({ type: 'documentTypes', value: true }));
    try {
      const response = isCheckSum? await get('rbDocumentType'): await RbService.fetchDocumentTypes();
      if (response.data) {
        if(!isCheckSum){
          await del('rbDocumentTypeSum')
          await del('rbDocumentType')
          await set('rbDocumentTypeSum',checksum.payload)
          await set('rbDocumentType',{data:response.data})
        }
        return response.data.map((item:RbDocumentTypeResponse) => ({
          id: item.id,
          name: item.name,
        }));
      }
    } catch (e) {
      alert(e)
    } finally {
      thunkAPI.dispatch(setLoading({ type: 'documentTypes', value: false }));
    }
  },
);

export const fetchRbAttachTypes = createAsyncThunk(
  'rb/fetchAttachTypes',
  async (arg, thunkAPI) => {
    const checksum  = await  thunkAPI.dispatch(fetchCheckSum({name:"rbAttachType"}))

    const currentCheckSum =  await get('rbAttachTypeSum') || ''

    const isCheckSum = currentCheckSum === checksum.payload
    try {
      const response = isCheckSum? await get('rbAttachType'): await RbService.fetchAttachTypes()
        if(!isCheckSum){
          await del('rbAttachTypeSum')
          await del('rbAttachType')
          await set('rbAttachTypeSum',checksum.payload)
          await set('rbAttachType',{data:response.data})
        }
      if (response.data) {
        return response.data.map((item:{ id: number;
          name: string;}) => ({
          id: item.id,
          name: item.name,
        }));
      }
    } catch (e) {
      alert(e)
    }
  },
);

export const fetchRbDetachmentReasons = createAsyncThunk(
  'rb/fetchDetachmentReasons',
  async (arg, thunkAPI) => {
    const checksum  = await  thunkAPI.dispatch(fetchCheckSum({name:"rbDetachmentReason"}))

    const currentCheckSum =  await get('rbDetachmentReasonSum') || ''

    const isCheckSum = currentCheckSum === checksum.payload
    try {
      const response = isCheckSum? await get('rbDetachmentReason'): await RbService.fetchDetachmentReasons()
      if(!isCheckSum){
        await del('rbDetachmentReasonSum')
        await del('rbDetachmentReason')
        await set('rbDetachmentReasonSum',checksum.payload)
        await set('rbDetachmentReason',{data:response.data})
      }
      if (response.data) {
        return response.data.map((item:{ id: number;
          name: string;}) => ({
          id: item.id,
          name: item.name,
        }));
      }
    } catch (e) {
      alert(e)
    }
  },
);

export const fetchRbPolicyDischargeReasons = createAsyncThunk(
  'rb/fetchPolicyDischargeReasons',
  async (arg, thunkAPI) => {
    const checksum  = await  thunkAPI.dispatch(fetchCheckSum({name:"rbPolicyDischargeReason"}))

    const currentCheckSum =  await get('rbPolicyDischargeReasonSum') || ''

    const isCheckSum = currentCheckSum === checksum.payload
    try {
      const response = isCheckSum? await get('rbPolicyDischargeReason'): await RbService.fetchPolicyDischargeReason()
      if(!isCheckSum){
        await del('rbPolicyDischargeReasonSum')
        await del('rbPolicyDischargeReason')
        await set('rbPolicyDischargeReasonSum',checksum.payload)
        await set('rbPolicyDischargeReason',{data:response.data})
      }
      if (response.data) {
        return response.data.map((item:{ id: number;
          name: string;}) => ({
          id: item.id,
          name: item.name,
        }));
      }
    } catch (e) {
      alert(e)
    }
  },
);

export const fetchSNILSMissingReasons = createAsyncThunk(
  'rb/fetchSNILSMissingReasons',
  async (arg, thunkAPI) => {
    const checksum  = await  thunkAPI.dispatch(fetchCheckSum({name:"rbSNILSMissingReason"}))

    const currentCheckSum =  await get('rbSNILSMissingReason') || ''

    const isCheckSum = currentCheckSum === checksum.payload
    try {
      const response = isCheckSum? await get('rbSNILSMissingReason'): await RbService.fetchSNILSMissingReasons()
      if(!isCheckSum){
        await del('rbSNILSMissingReasonSum')
        await del('rbSNILSMissingReason')
        await set('rbSNILSMissingReasonSum',checksum.payload)
        await set('rbSNILSMissingReason',{data:response.data})
      }
      if (response.data) {
        return response.data.map((item:{ id: number;
          name: string;}) => ({
          id: item.id,
          name: item.name,
        }));
      }
    } catch (e) {
      alert(e)
    }
  },
);

export const fetchRbPolicyTypes = createAsyncThunk(
  'rb/fetchPolicyTypes',
  async (arg, thunkAPI) => {
    const checksum  = await  thunkAPI.dispatch(fetchCheckSum({name:"rbPolicyType"}))

    const currentCheckSum =  await get('rbPolicyTypeSum') || ''

    const isCheckSum = currentCheckSum === checksum.payload
    try {
      const response = isCheckSum? await get('rbPolicyType'): await RbService.fetchPolicyTypes()
      if (response.data) {
      if(!isCheckSum){
        await del('rbPolicyTypeSum')
        await del('rbPolicyType')
        await set('rbPolicyTypeSum',checksum.payload)
        await set('rbPolicyType',{data:response.data})
      }
        return response.data.map((item:{ id: number;
          name: string;}) => ({
          id: item.id,
          name: item.name,
        }));
      }
    } catch (e) {
      alert(e)
    }
  },
);

export const fetchRbOrgStructure = createAsyncThunk(
  'rb/fetchOrgStructure',
  async (arg, thunkAPI) => {
    const checksum  = await  thunkAPI.dispatch(fetchCheckSum({name:"OrgStructure"}))

    const currentCheckSum =  await get('OrgStructureSum') || ''

    const isCheckSum = currentCheckSum === checksum.payload

    thunkAPI.dispatch(setLoading({ type: 'orgStructure', value: true }));
    try {
      const response = isCheckSum? await get('OrgStructure'): await RbService.fetchOrgStructure()
      if (response.data) {
      if(!isCheckSum){
        await del('OrgStructureSum')
        await del('OrgStructure')
        await set('OrgStructureSum',checksum.payload)
        await set('OrgStructure',{data:response.data})
      }
        return response.data.map((item:OrgStructure) => ({
          id: item.id,
          name: item.name,
          attachCode: item.attachCode,
          organisation_id: item.organisation_id,
        }));
      }
    } catch (e) {
      alert(e)
    } finally {
      thunkAPI.dispatch(setLoading({ type: 'orgStructure', value: false }));
    }
  },
);

export const fetchRbPolicyKind = createAsyncThunk(
  'rb/fetchPolicyKind',
  async (arg, thunkAPI) => {
    const checksum  = await  thunkAPI.dispatch(fetchCheckSum({name:"rbPolicyKind"}))

    const currentCheckSum =  await get('rbPolicyKindSum') || ''

    const isCheckSum = currentCheckSum === checksum.payload
    try {
      const response = isCheckSum? await get('rbPolicyKind'): await RbService.fetchPolicyKind()
      if (response.data) {
      if(!isCheckSum){
        await del('rbPolicyKindSum')
        await del('rbPolicyKind')
        await set('rbPolicyKindSum',checksum.payload)
        await set('rbPolicyKind',{data:response.data})
      }
        return response.data.map((item:{ id: number;
          name: string;}) => ({
          id: item.id,
          name: item.name,
        }));
      }
    } catch (e) {
      alert(e)
    }
  },
);

export const fetchRbContactTypes = createAsyncThunk(
  'rb/fetchContactTypes',
  async (arg, thunkAPI) => {
    const checksum  = await  thunkAPI.dispatch(fetchCheckSum({name:"rbContactType"}))

    const currentCheckSum =  await get('rbContactTypeSum') || ''

    const isCheckSum = currentCheckSum === checksum.payload
    try {
      const response = isCheckSum? await get('rbContactType'): await RbService.fetchContactTypes();
      if (response.data) {
      if(!isCheckSum){
        await del('rbContactTypeSum')
        await del('rbContactType')
        await set('rbContactTypeSum',checksum.payload)
        await set('rbContactType',{data:response.data})
      }
        return response.data.map((item:{  id: number;
          name: string;
          mask: string;}) => ({
          id: item.id,
          name: item.name,
          mask: item.mask.replace(/[0-9]/g, '1'),
        }));
      }
    } catch (e) {
      alert(e)
    }
  },
);

export const fetchRbSocialStatusType = createAsyncThunk(
  'rb/fetchRbSocialStatusType',
  async (arg, thunkAPI) => {
    thunkAPI.dispatch(setLoading({ type: 'socialTypes', value: true }));
    const checksum  = await  thunkAPI.dispatch(fetchCheckSum({name:"rbSocStatusType"}))
    const currentCheckSum =  await get('rbSocStatusTypeSum') || ''
    const isCheckSum = currentCheckSum === checksum.payload
    try {
      const response = isCheckSum? await get('rbSocStatusType'): await RbService.fetchSocialTypes();
      if (response.data) {
        if(!isCheckSum){
          await del('rbSocStatusTypeSum')
          await del('rbSocStatusType')
          await set('rbSocStatusTypeSum',checksum.payload)
          await set('rbSocStatusType',{data:response.data})
        }
        return response.data;
      }
    } catch (e) {
      alert(e)
    } finally {
      thunkAPI.dispatch(setLoading({ type: 'socialTypes', value: false }));
    }
  },
);

export const fetchRbSocialStatusClass = createAsyncThunk(
  'rb/fetchRbSocialStatusClass',
  async (arg, thunkAPI) => {
    thunkAPI.dispatch(setLoading({ value: true, type: 'socialClasses' }));

    const checksum  = await  thunkAPI.dispatch(fetchCheckSum({name:"rbSocStatusClass"}));
    const currentCheckSum =  await get('rbSocStatusClassSum') || ''
    const isCheckSum = currentCheckSum === checksum.payload

    try {
      const response = isCheckSum? await get('rbSocStatusClass'): await RbService.fetchSocialClasses();
      if (response.data) {
        if(!isCheckSum){
          await del('rbSocStatusClassSum')
          await del('rbSocStatusClass')
          await set('rbSocStatusClassSum',checksum.payload)
          await set('rbSocStatusClass',{data:response.data})
        }
        return response.data;
      }
    } catch (e) {
      alert(e)
    } finally {
      thunkAPI.dispatch(setLoading({ value: false, type: 'socialClasses' }));
    }
  },
);

const rbSlice = createSlice({
  name: 'rb',
  initialState: {
    checksum:{
      rbOrganisations:'',
      rbAttachTypes: '',
      rbPolicyTypes: '',
      rbContactTypes: '',
      rbOrgStructure: '',
      rbDocumentTypes: '',
      rbSNILSMissingReasons: '',
      rbPolicyDischargeReasons: '',
      rbSocialTypes: '',
      rbSocialClasses: '',
    },
    rbPersons: [] as Person[],
    rbOrganisations: [] as Organisation[],
    rbAttachTypes: [] as AttachType[],
    rbDetachmentReasons: [] as DetachmentReason[],
    rbSNILSMissingReasons: [] as SNILSMissingReason[],
    rbPolicyTypes: [] as PolicyType[],
    rbPolicyKinds: [] as PolicyKind[],
    rbContactTypes: [] as PatientContactType[],
    rbOrgStructure: [] as OrgStructure[],
    rbDocumentTypes: [] as PatientDocumentType[],
    rbRelationTypesDirectLink: [] as RelatiionsTypes[],
    rbRelationTypesRelativeLink: [] as RelatiionsTypes[],
    rbPolicyDischargeReasons: [] as PolicyDischargeReason[],
    rbSocialTypes: [] as SocialType[],
    rbSocialClasses: [] as SocialClass[],
    loading: {
      attachTypes: false,
      organisations: false,
      orgStructure: false,
      documentTypes: false,
      detachmentReasons: false,
      SNILSMissingReasons: false,
      relationTypes: false,
      policyDischargeReasons: false,
      socialTypes: false,
      socialClasses: false,
    },
  },
  reducers: {
    setLoading: (
      state,
      action: PayloadAction<{
        type:
          | 'attachTypes'
          | 'detachmentReasons'
          | 'SNILSMissingReasons'
          | 'orgStructure'
          | 'organisations'
          | 'documentTypes'
          | 'relationTypes'
          | 'policyDischargeReasons'
          | 'socialTypes'
          | 'socialClasses';
        value: boolean;
      }>,
    ) => {
      state.loading[action.payload.type] = action.payload.value;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchRbPersons.fulfilled, (state, action) => {
      if (action.payload) {
        // @ts-ignore
        state.rbPersons = action.payload;
      }
    });
    builder.addCase(fetchRbPersonsSearch.fulfilled, (state, action) => {
      if (action.payload) {
        state.rbPersons = action.payload;
      }
    });

    builder.addCase(fetchRbOrganisations.fulfilled, (state, action) => {
      if (action.payload) {
        state.rbOrganisations = action.payload.map((item:{
          area: string;
          id: number;
          fullName: string;
          shortName: string;
          isInsurer: 0 | 1;
          INN: string;
          OGRN: string;}) => ({
          id: item.id,
          fullName: item.fullName,
          shortName: item.shortName,
          isInsurer: !!item.isInsurer,
          inn: item.INN,
          ogrn: item.OGRN,
          area: item.area,
        }));
      }
    });

    builder.addCase(fetchRbRelationTypes.fulfilled, (state, action) => {
      if (action.payload) {
         const personSex = action.meta.arg.sex+1
         state.rbRelationTypesDirectLink = action.payload.filter((relation)=> personSex === relation.leftSex || relation.leftSex === 0)
         state.rbRelationTypesRelativeLink = action.payload.filter((relation)=> personSex === relation.rightSex || relation.rightSex === 0)

      }

    });
    builder.addCase(fetchRbAttachTypes.fulfilled, (state, action) => {
      if (action.payload) {
        state.rbAttachTypes = action.payload;
      }
    });
    builder.addCase(fetchRbDetachmentReasons.fulfilled, (state, action) => {
      if (action.payload) {
        state.rbDetachmentReasons = action.payload;
      }
    });
    builder.addCase(fetchSNILSMissingReasons.fulfilled, (state, action) => {
      if (action.payload) {
        state.rbSNILSMissingReasons = action.payload;
      }
    });
    builder.addCase(fetchRbPolicyDischargeReasons.fulfilled, (state, action) => {
      if (action.payload) {
        state.rbPolicyDischargeReasons = action.payload;
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
    builder.addCase(fetchRbOrgStructure.fulfilled, (state, action) => {
      if (action.payload) {
        state.rbOrgStructure = action.payload;
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
