import { useDispatch } from 'react-redux';

import {
  fetchRbAttachTypes,
  fetchRbDetachmentReasons,
  fetchSNILSMissingReasons,
  fetchRbPolicyDischargeReasons,
  fetchRbContactTypes,
  fetchRbDocumentTypes,
  fetchRbOrganisations,
  fetchRbPersons,
  fetchRbPolicyKind,
  fetchRbPolicyTypes,
  fetchRbOrgStructure,
} from '../slices/rb/rbSlice';


export default function useInitialFetch() {
  const dispatch = useDispatch();

  return () => {
    dispatch(fetchRbPersons());
    dispatch(fetchRbOrganisations());
    dispatch(fetchRbAttachTypes());
    dispatch(fetchRbDetachmentReasons());
    dispatch(fetchSNILSMissingReasons());
    dispatch(fetchRbPolicyDischargeReasons());
    dispatch(fetchRbContactTypes());
    dispatch(fetchRbDocumentTypes());
    dispatch(fetchRbPolicyKind());
    dispatch(fetchRbPolicyTypes());
    dispatch(fetchRbOrgStructure());
  };
}
