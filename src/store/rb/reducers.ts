import { RbActionsType, SET_RB_EVENT_TYPES, SET_RB_PERSONS } from './types';

const initialState = {
  rbPersons: [],
  rbEventTypes: [],
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
    default:
      return state;
  }
}
