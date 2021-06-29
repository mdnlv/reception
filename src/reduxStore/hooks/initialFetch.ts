import { useDispatch } from 'react-redux';

import {
  fetchRbAccountingSystem,
  fetchRbAttachTypes,
  fetchRbDetachmentReasons,
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
  fetchDeferredQueueStatus,
  fetchRbPost
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
    dispatch(fetchRbDetachmentReasons());
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
    dispatch(fetchPersonTree({}));
    dispatch(fetchDeferredQueueStatus());
    dispatch(fetchRbPost());
  };
}
