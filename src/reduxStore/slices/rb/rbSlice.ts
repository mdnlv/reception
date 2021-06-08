import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

import {get, set, del } from  '../../../services/IndexDbService';

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
import SocialType from '../../../types/data/SocialType';
import SocialClass from '../../../types/data/SocialClass';
import HurtType from '../../../types/data/HurtType';
import HurtFactorType from '../../../types/data/HurtFactorType';
import OrgStructure from "../../../types/data/OrgStructure";
import RbDocumentTypeResponse  from '../../../../src/interfaces/responses/rb/rbDocumentType'
import RbInvalidDocumentTypeResponse from "../../../../src/interfaces/responses/rb/rbInvalidDocumentType";
import RelatiionsTypes from '../../../interfaces/responses/rb/rbRelationType'
import Speciality from "../../../types/data/Speciality";
import Post from "../../../types/data/Post";

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

export const fetchRbRelationTypes = createAsyncThunk(
  'rb/fetchRelationTypes',
  async (payload: { sex:number }, thunkAPI) => {
    try {
      const response = await RbService.fetchRelationTypes();
      if (response.data) {
          return response.data
      }
    } catch (e) {
    } finally {
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

export const fetchRbSpecialities = createAsyncThunk(
  'rb/fetchSpecialities',
  async (arg, thunkAPI) => {
    const checksum  = await  thunkAPI.dispatch(fetchCheckSum({name:"rbSpeciality"}))
    const currentCheckSum =  await get('SpecialitySum') || ''
    const isCheckSum = currentCheckSum === checksum.payload
    thunkAPI.dispatch(setLoading({ type: 'specialities', value: true }));
    try {
      const response = isCheckSum ? await get('Speciality'):  await RbService.fetchSpeciality()
      if (response.data) {
        if(!isCheckSum){
         await del('SpecialitySum')
         await del('Speciality')
         await set('SpecialitySum',checksum.payload)
         await set('Speciality',{data:response.data})
        }
        return response.data;
      }
    } catch (e) {
      alert(e);
      thunkAPI.rejectWithValue(e);
    } finally {
      thunkAPI.dispatch(setLoading({ type: 'specialities', value: false }));
    }
  },
);


export const fetchRbInvalidReasons = createAsyncThunk(
  'rb/fetchInvalidReasons',
  async (arg, thunkAPI) => {
    const checksum  = await thunkAPI.dispatch(fetchCheckSum({name:"rbTempInvalidReason"}))

    const currentCheckSum =  await get('rbTempInvalidReasonSum') || ''

    const isCheckSum = currentCheckSum === checksum.payload
    try {
      const response = isCheckSum ? await get('rbTempInvalidReason'):  await RbService.fetchInvalidReasons();
      if (response.data) {
        if(!isCheckSum){
          await del('rbTempInvalidReasonSum')
          await del('rbTempInvalidReason')
          await set('rbTempInvalidReasonSum',checksum.payload)
          await set('rbTempInvalidReason',{data:response.data})
         }
        return response.data;
      }
    } catch (e) {
      alert(e)
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

export const fetchRbInvalidDocumentsTypes = createAsyncThunk(
  'rb/fetchInvaludDocuments',
  async (arg, thunkAPI) => {
    const checksum  = await  thunkAPI.dispatch(fetchCheckSum({name:"rbTempInvalidDocument"}))

    const currentCheckSum =  await get('rbTempInvalidDocumentSum') || ''

    const isCheckSum = currentCheckSum === checksum.payload
    try {
      const response = isCheckSum? await get('rbTempInvalidDocument'): await RbService.fetchInvalidDocumentTypes();;
      if (response.data) {
        if(!isCheckSum){
          await del('rbTempInvalidDocumentSum')
          await del('rbTempInvalidDocument')
          await set('rbTempInvalidDocumentSum',checksum.payload)
          await set('rbTempInvalidDocument',{data:response.data})
        }
        return response.data.map((item:RbInvalidDocumentTypeResponse) => ({
          id: item.id,
          name: item.name,
          code: item.code,
        }));
      }
    } catch (e) {
      alert(e)
    }
  },
);

export const fetchRbAccountingSystem = createAsyncThunk(
  'rb/fetchAccountingSystem',
  async (arg, thunkAPI) => {
    const checksum  = await  thunkAPI.dispatch(fetchCheckSum({name:"rbAccountingSystem"}))

    const currentCheckSum =  await get('rbAccountingSystemSum') || ''

    const isCheckSum = currentCheckSum === checksum.payload
    try {
      const response = isCheckSum? await get('rbAccountingSystem'): await RbService.fetchAccountingSystem();
      if (response.data) {
        if(!isCheckSum){
          await del('rbAccountingSystemSum')
          await del('rbAccountingSystem')
          await set('rbAccountingSystemSum',checksum.payload)
          await set('rbAccountingSystem',{data:response.data})
        }
        return response.data.map((item:{id: number;
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

export const fetchRbPolicyTypes = createAsyncThunk(
  'rb/fetchPolicyTypes',
  async (arg, thunkAPI) => {
    const checksum  = await  thunkAPI.dispatch(fetchCheckSum({name:"rbPolicyType"}))

    const currentCheckSum =  await get('rbPolicyTypeSum') || ''

    const isCheckSum = currentCheckSum === checksum.payload
    try {
      const response = isCheckSum? await get('rbPolicyType'): await RbService.fetchAttachTypes()
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
          name: item.name
        }));
      }
    } catch (e) {
      alert(e)
    } finally {
      thunkAPI.dispatch(setLoading({ type: 'orgStructure', value: false }));
    }
  },
);

export const fetchRbPost = createAsyncThunk(
  'rb/fetchPost',
  async (arg, thunkAPI) => {
    const checksum  = await  thunkAPI.dispatch(fetchCheckSum({name:"Post"}))

    const currentCheckSum =  await get('OrgPost') || ''

    const isCheckSum = currentCheckSum === checksum.payload

    thunkAPI.dispatch(setLoading({ type: 'post', value: true }));
    try {
      const response = isCheckSum? await get('Post'): await RbService.fetchPost()
      if (response.data) {
      if(!isCheckSum){
        await del('PostSum')
        await del('Post')
        await set('PostSum',checksum.payload)
        await set('Post',{data:response.data})
      }
        return response.data.map((item:Post) => ({
          id: item.id,
          name: item.name
        }));
      }
    } catch (e) {
      alert(e)
    } finally {
      thunkAPI.dispatch(setLoading({ type: 'post', value: false }));
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

export const fetchRbHurtType = createAsyncThunk(
  'rb/fetchRbHurtType',
  async (arg, thunkAPI) => {
    thunkAPI.dispatch(setLoading({ type: 'hurtTypes', value: true }));


    const checksum  = await  thunkAPI.dispatch(fetchCheckSum({name:"rbHurtType"}))

    const currentCheckSum =  await get('rbHurtTypeSum') || ''

    const isCheckSum = currentCheckSum === checksum.payload
    try {

      const response = isCheckSum? await get('rbHurtType'): await RbService.fetchHurtTypes();
      if (response.data) {
      if(!isCheckSum){
        await del('rbHurtTypeSum')
        await del('rbHurtType')
        await set('rbHurtTypeSum',checksum.payload)
        await set('rbHurtType',{data:response.data})
      }

        return response.data;
      }
    } catch (e) {
      alert(e)
    } finally {
      thunkAPI.dispatch(setLoading({ type: 'hurtTypes', value: false }));
    }
  },
);

export const fetchRbHurtFactorTypes = createAsyncThunk(
  'rb/fetchRbHurtFactorType',
  async (arg, thunkAPI) => {
    thunkAPI.dispatch(setLoading({ type: 'hurtFactorTypes', value: true }));

    const checksum  = await  thunkAPI.dispatch(fetchCheckSum({name:"rbHurtFactorType"}))

    const currentCheckSum =  await get('rbHurtFactorTypeSum') || ''

    const isCheckSum = currentCheckSum === checksum.payload
    try {

      const response = isCheckSum? await get('rbHurtFactorType'): await RbService.fetchHurtFactorTypes()
      if (response.data) {
      if(!isCheckSum){
        await del('rbHurtFactorTypeSum')
        await del('rbHurtFactorType')
        await set('rbHurtFactorTypeSum',checksum.payload)
        await set('rbHurtFactorType',{data:response.data})
      }

        return response.data;
      }
    } catch (e) {
      alert(e)
    } finally {
      thunkAPI.dispatch(setLoading({ type: 'hurtFactorTypes', value: false }));
    }
  },
);

const rbSlice = createSlice({
  name: 'rb',
  initialState: {
    checksum:{
      rbEventTypes:'',
      rbOrganisations:'',
      rbInvalidReasons:'',
      rbInvalidDocuments:'',
      rbAccountingSystem:'',
      rbAttachTypes: '',
      rbPolicyTypes: '',
      rbContactTypes: '',
      rbOrgStructure: '',
      rbPost: '',
      rbDocumentTypes: '',
      rbSocialTypes: '',
      rbSocialClasses: '',
      rbSpecialities: '',
      rbHurtTypes: '',
      rbHurtFactorTypes: ''
    },
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
    rbOrgStructure: [] as OrgStructure[],
    rbPost: [] as Post[],
    rbDocumentTypes: [] as PatientDocumentType[],
    rbSocialTypes: [] as SocialType[],
    rbSocialClasses: [] as SocialClass[],
    rbSpecialities: [] as Speciality[],
    rbHurtTypes: [] as HurtType[],
    rbHurtFactorTypes: [] as HurtFactorType[],
    rbRelationTypesDirectLink: [] as RelatiionsTypes[],
    rbRelationTypesRelativeLink: [] as RelatiionsTypes[],
    loading: {
      attachTypes: false,
      organisations: false,
      orgStructure: false,
      post: false,
      documentTypes: false,
      socialTypes: false,
      socialClasses: false,
      specialities: false,
      hurtTypes: false,
      hurtFactorTypes: false,
    },
  },
  reducers: {
    setLoading: (
      state,
      action: PayloadAction<{
        type:
          | 'attachTypes'
          | 'orgStructure'
          | 'post'
          | 'organisations'
          | 'documentTypes'
          | 'socialTypes'
          | 'socialClasses'
          | 'specialities'
          | 'hurtTypes'
          | 'hurtFactorTypes';
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
    builder.addCase(fetchRbPersonsSearch.fulfilled, (state, action) => {
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
        state.rbOrganisations = action.payload.map((item:{  id: number;
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
          ogrn: item.OGRN
        }));
      }
    });
    builder.addCase(fetchRbSpecialities.fulfilled, (state, action) => {
      if (action.payload) {
        state.rbSpecialities = action.payload.map((item:{  id: number;
          name: string;
        }) => ({
          id: item.id,
          name: item.name,
        }));
      }
    });
    builder.addCase(fetchRbPost.fulfilled, (state, action) => {
      if (action.payload) {
        state.rbPost = action.payload.map((item:{  id: number;
          name: string;
        }) => ({
          id: item.id,
          name: item.name,
        }));
      }
    });
    builder.addCase(fetchRbInvalidReasons.fulfilled, (state, action) => {
      if (action.payload) {
        state.rbInvalidReasons = action.payload;
      }
    });
    builder.addCase(fetchRbRelationTypes.fulfilled, (state, action) => {
      if (action.payload) {
         const personSex = action.meta.arg.sex+1
         state.rbRelationTypesDirectLink = action.payload.filter((relation)=> personSex === relation.leftSex || relation.leftSex === 0)
         state.rbRelationTypesRelativeLink = action.payload.filter((relation)=> personSex === relation.rightSex || relation.rightSex === 0)

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
    builder.addCase(fetchRbSocialStatusType.fulfilled, (state, action) => {
      if (action.payload) {
        state.rbSocialTypes = action.payload;
      }
    });
    builder.addCase(fetchRbSocialStatusClass.fulfilled, (state, action) => {
      if (action.payload) {
        state.rbSocialClasses = action.payload;
      }
    });
    builder.addCase(fetchRbHurtType.fulfilled, (state, action) => {
      if (action.payload) {
        state.rbHurtTypes = action.payload;
      }
    });
    builder.addCase(fetchRbHurtFactorTypes.fulfilled, (state, action) => {
      if (action.payload) {
        state.rbHurtFactorTypes = action.payload;
      }
    });
  },
});

export const { setLoading } = rbSlice.actions;
export default rbSlice;
