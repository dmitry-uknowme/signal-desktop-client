export enum IGateModes {
  MODE_MANUAL = 'MODE_MANUAL',
  MODE_AUTO = 'MODE_AUTO',
  MODE_FREEZED = 'MODE_FREEZED',
}

export enum GatesIds {
  INPUT = 'INPUT',
  OUTPUT = 'OUTPUT',
}

export enum GateActionTypes {
  FETCH_GATES = 'FETCH_GATES',
  OPEN_GATE = 'OPEN_GATE',
  FREEZE_GATE = 'FREEZE_GATE',
  CLOSE_GATE = 'CLOSE_GATE',
  SWITCH_GATE_MODE = 'SWITCH_GATE_MODE',
  FREEZE_GATE_MODE = 'FREEZE_GATE_MODE',
}

interface FetchGatesAction {
  type: GateActionTypes.FETCH_GATES
  payload: any | { error: boolean; message: string }
}

interface OpenGateAction {
  type: GateActionTypes.OPEN_GATE
  payload: GatesIds | { error: boolean; message: string }
}

interface CloseGateAction {
  type: GateActionTypes.CLOSE_GATE
  payload: GatesIds | { error: boolean; message: string }
}
interface FreezeGateAction {
  type: GateActionTypes.FREEZE_GATE
  payload: GatesIds | { error: boolean; message: string }
}

interface SwitchGateModeAction {
  type: GateActionTypes.SWITCH_GATE_MODE
  payload: IGateModes | { error: boolean; message: string }
}
interface FreezeGateModeAction {
  type: GateActionTypes.FREEZE_GATE_MODE
  payload: IGateModes | { error: boolean; message: string }
}

export type GateAction =
  | FetchGatesAction
  | OpenGateAction
  | FreezeGateAction
  | CloseGateAction
  | SwitchGateModeAction
  | FreezeGateModeAction
