import { useDispatch } from 'react-redux';

import {
  fetchRbAccountingSystem,
  fetchRbAttachTypes,
  fetchRbContactTypes,
  fetchRbDocumentTypes,
  fetchRbEventTypes,
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
} from '../slices/rb/rbSlice';

export default function useInitialFetch() {
  const dispatch = useDispatch();

  return () => {
    dispatch(fetchRbPersons());
    dispatch(fetchRbEventTypes());
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
    dispatch(fetchRbHurtType());
    dispatch(fetchRbHurtFactorTypes());
  };
}
