import { useDispatch } from 'react-redux';

import {
  fetchRbAccountingSystem,
  fetchRbAttachTypes,
  fetchRbContactTypes,
  fetchRbDocumentTypes,
  fetchRbEventTypes,
  fetchRbSpeciality,
  fetchRbHurtFactorTypes,
  fetchRbHurtType,
  fetchRbInvalidDocumentsTypes,
  fetchRbInvalidReasons,
  fetchRbOrganisations,
  fetchRbPersons,
  fetchRbPolicyKind,
  fetchRbPolicyTypes,
  fetchRbSocialStatusClass,
  fetchRbSocialStatusType,
  fetchRbSpecialities,
  fetchRbOrgStructure,
  fetchRbPost,
  fetchDeferredQueueStatus
} from '../slices/rb/rbSlice';
import {fetchPersonTree} from '../slices/personTree/personTreeSlice'


export default function useInitialFetch() {
  const dispatch = useDispatch();

  return () => {
    dispatch(fetchRbPersons());
    dispatch(fetchRbEventTypes());
    dispatch(fetchRbSpeciality());
    dispatch(fetchRbInvalidReasons());
    dispatch(fetchRbOrganisations());
    dispatch(fetchRbInvalidDocumentsTypes());
    dispatch(fetchRbAccountingSystem());
    dispatch(fetchRbAttachTypes());
    dispatch(fetchRbContactTypes());
    dispatch(fetchRbDocumentTypes());
    dispatch(fetchRbPolicyKind());
    dispatch(fetchRbPolicyTypes());
    dispatch(fetchRbSocialStatusType());
    dispatch(fetchRbSocialStatusClass());
    dispatch(fetchRbSpecialities());
    dispatch(fetchRbHurtType());
    dispatch(fetchRbHurtFactorTypes());
    dispatch(fetchRbOrgStructure());
    dispatch(fetchRbPost());
    dispatch(fetchPersonTree({}));
    dispatch(fetchDeferredQueueStatus())
    
  };
}
