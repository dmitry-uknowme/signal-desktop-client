import {
  GateAction,
  GateActionTypes,
  GatesIds,
  GatesVectors,
} from '../types/gate'

const defaultState = {
  inputGateStatus: 'LOCKED',
  outputGateStatus: 'LOCKED',
  mode: 'MODE_MANUAL',
}

const gateReducer = (state = defaultState, action: GateAction) => {
  switch (action.type) {
    case GateActionTypes.FETCH_GATES:
      return { ...state, ...action.payload }
    case GateActionTypes.OPEN_GATE:
      return {
        ...state,
        ...{
          ...(action.payload.id === GatesIds.INPUT &&
          action.payload.vector === GatesVectors.ENTRY
            ? { inputGateStatus: 'UNLOCKED_ENTRY' }
            : action.payload.id === GatesIds.INPUT &&
              action.payload.vector === GatesVectors.EXIT
            ? { inputGateStatus: 'UNLOCKED_EXIT' }
            : action.payload.id === GatesIds.OUTPUT &&
              action.payload.vector === GatesVectors.ENTRY
            ? { outputGateStatus: 'UNLOCKED_ENTRY' }
            : action.payload.id === GatesIds.OUTPUT &&
              action.payload.vector === GatesVectors.EXIT
            ? { outputGateStatus: 'UNLOCKED_EXIT' }
            : null),
        },
      }
    case GateActionTypes.FREEZE_GATE:
      return {
        ...state,
        ...{
          ...(action.payload === GatesIds.INPUT
            ? { inputGateStatus: 'FREEZED' }
            : { outputGateStatus: 'FREEZED' }),
        },
      }
    case GateActionTypes.CLOSE_GATE:
      return {
        ...state,
        ...{
          ...(action.payload.id === GatesIds.INPUT
            ? { inputGateStatus: 'LOCKED' }
            : { outputGateStatus: 'LOCKED' }),
        },
      }
    case GateActionTypes.SWITCH_GATE_MODE:
      return { ...state, mode: action.payload }
    default:
      return state
  }
}

export default gateReducer
