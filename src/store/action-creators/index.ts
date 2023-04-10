import * as CarActionCreators from "./car";
import * as GateActionCreators from "./gate";
import * as AlertActionCreators from "./alert";
import * as SettingsActionCreators from "./settings";

export default {
  ...CarActionCreators,
  ...GateActionCreators,
  ...AlertActionCreators,
  ...SettingsActionCreators,
};
