import {
  RbActionsType,
  SET_RB_ACCOUNTING_SYSTEM,
  SET_RB_ATTACH_TYPES,
  SET_RB_EVENT_TYPES,
  SET_RB_INVALID_DOCUMENTS,
  SET_RB_INVALID_REASONS,
  SET_RB_ORGANISATIONS,
  SET_RB_PERSONS,
} from './types';
import Person from '../../types/data/Person';
import EventType from '../../types/data/EventType';
import Organisation from '../../types/data/Organisation';
import InvalidReason from '../../types/data/InvalidReason';
import InvalidDocument from '../../types/data/InvalidDocument';
import AccountingSystemItem from '../../types/data/AccountinSystemItem';
import AttachType from '../../types/data/AttachType';

const initialState = {
  rbPersons: [] as Person[],
  rbEventTypes: [] as EventType[],
  rbOrganisations: [] as Organisation[],
  rbInvalidReasons: [] as InvalidReason[],
  rbInvalidDocuments: [] as InvalidDocument[],
  rbAccountingSystem: [] as AccountingSystemItem[],
  rbAttachTypes: [] as AttachType[],
};

export default function RbReducer(state = initialState, action: RbActionsType) {
  switch (action.type) {
    case SET_RB_PERSONS:
      return {
        ...state,
        rbPersons: action.payload,
      };
    case SET_RB_EVENT_TYPES:
      return {
        ...state,
        rbEventTypes: action.payload,
      };
    case SET_RB_ORGANISATIONS:
      return {
        ...state,
        rbOrganisations: action.payload,
      };
    case SET_RB_INVALID_REASONS:
      return {
        ...state,
        rbInvalidReasons: action.payload,
      };
    case SET_RB_INVALID_DOCUMENTS:
      return {
        ...state,
        rbInvalidDocuments: action.payload,
      };
    case SET_RB_ACCOUNTING_SYSTEM:
      return {
        ...state,
        rbAccountingSystem: action.payload,
      };
    case SET_RB_ATTACH_TYPES:
      return {
        ...state,
        rbAttachTypes: action.payload,
      };
    default:
      return state;
  }
}
