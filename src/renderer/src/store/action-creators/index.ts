import * as CarActionCreators from './car'
import * as GateActionCreators from './gate'
import * as AlertActionCreators from './alert'

export default { ...CarActionCreators, ...GateActionCreators, ...AlertActionCreators }
