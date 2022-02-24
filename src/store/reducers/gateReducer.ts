import { GateAction, GateActionTypes, GatesIds } from '../types/gate'

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
          ...(action.payload === GatesIds.INPUT
            ? { inputGateStatus: 'UNLOCKED' }
            : { outputGateStatus: 'UNLOCKED' }),
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
          ...(action.payload === GatesIds.INPUT
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
