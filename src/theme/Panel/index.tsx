import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Button from "../base/Button";
import SwitchBox from "../base/Switch";
import {
  setIsModalEnterOpened,
  setIsModalExitOpened,
} from "../../store/reducers/modalReducer";

import useActions from "../../hooks/useActions";
import { GatesIds, GatesVectors, IGateModes } from "../../store/types/gate";
import CamerasBlock from "../CamerasBlock";
import { toast } from "react-toastify";

const Panel = () => {
  const notify = () => toast("Wow so easy!");
  const dispatch = useDispatch();
  const [error, setError] = useState(null);
  const { fetchGateStatus, openGate, closeGate, switchGateMode } = useActions();
  const gateStore = useSelector((store) => store.gate);
  const isManualMode = useSelector(
    (store) => store.gate.mode === "MODE_MANUAL"
  );
  const isManualModeFreezed = useSelector(
    (store) => store.gate.mode === "MODE_FREEZED"
  );
  const isInputGateEntryOpened = useSelector(
    (store) => store.gate.inputGateStatus === "UNLOCKED_ENTRY"
  );
  const isInputGateExitOpened = useSelector(
    (store) => store.gate.inputGateStatus === "UNLOCKED_EXIT"
  );
  const isOutputGateEntryOpened = useSelector(
    (store) => store.gate.outputGateStatus === "UNLOCKED_ENTRY"
  );
  const isOutputGateExitOpened = useSelector(
    (store) => store.gate.outputGateStatus === "UNLOCKED_EXIT"
  );

  const openModalEnter = () => {
    dispatch(
      setIsModalEnterOpened({
        weight: (Math.random() * (1000 - 500) + 500).toFixed(0),
      })
    );
  };

  const openModalExit = () => {
    dispatch(
      setIsModalExitOpened({
        weight: (Math.random() * (200 - 100) + 100).toFixed(0),
      })
    );
  };

  useEffect(() => {
    if (error) {
      setTimeout(() => {
        setError(null);
      }, 3000);
    }
  }, [error]);

  useEffect(() => {
    fetchGateStatus();
  }, []);

  return (
    <div className="panel h-100">
      <div className="panel__alert">
        <div className={`panel__alert-overlay ${error && "_active"}`}></div>
        <div className={`panel__alert-window bg-danger ${error && "_active"}`}>
          <h3 className="panel__alert-title text-center">{error}</h3>
        </div>
      </div>

      <h2 className="panel__title">Панель управления</h2>
      <div className="panel__form">
        <div className="row mt-3">
          <div className="col-md-12">
            <SwitchBox
              name="manual_mode"
              label="Ручное управление"
              className="panel__form-field"
              isChecked={isManualMode}
              disabled={isManualModeFreezed}
              setChecked={() =>
                isManualMode
                  ? switchGateMode(IGateModes.MODE_AUTO)
                  : switchGateMode(IGateModes.MODE_MANUAL)
              }
            />
          </div>
        </div>

        <div className="mt-5">
          <div className="col-md-12 d-flex justify-content-between panel__joystick align-items-center">
            <div
              className={`d-flex align-items-center panel__joystick-close ${
                isInputGateEntryOpened ? "_active" : ""
              }`}
              onClick={() => openGate(GatesIds.INPUT, GatesVectors.ENTRY)}
            >
              <span
                className="panel__joystick-close-text"
                style={{ fontWeight: 700, fontSize: "0.85rem" }}
              >
                {/* {isInputGateOpened ? 'Закрыть' : 'Закрыт'} */}
                Въезд
              </span>
              <div className="triangle panel__joystick-close-btn"></div>
            </div>
            <span style={{ fontWeight: 700 }}>Шлагбаум №1</span>
            <div
              className={`d-flex align-items-center panel__joystick-open ${
                isInputGateExitOpened ? "_active" : ""
              }`}
              onClick={() => openGate(GatesIds.INPUT, GatesVectors.EXIT)}
            >
              <div className="triangle panel__joystick-open-btn"></div>
              <span
                className="panel__joystick-open-text"
                style={{ fontWeight: 700, fontSize: "0.85rem" }}
              >
                Выезд
                {/* {isInputGateOpened ? 'Открыт' : 'Открыть'} */}
              </span>
            </div>
          </div>
        </div>
        <div className="mt-3">
          <div className="col-md-12 d-flex justify-content-between panel__joystick align-items-center">
            <div
              className={`d-flex align-items-center panel__joystick-close ${
                isOutputGateEntryOpened ? "_active" : ""
              }`}
              onClick={() => openGate(GatesIds.OUTPUT, GatesVectors.ENTRY)}
            >
              <span
                className="panel__joystick-close-text"
                style={{ fontWeight: 700, fontSize: "0.85rem" }}
              >
                Въезд
                {/* {isOutputGateOpened ? 'Закрыть' : 'Закрыт'} */}
              </span>
              <div className="triangle panel__joystick-close-btn"></div>
            </div>
            <span style={{ fontWeight: 700 }}>Шлагбаум №2</span>
            <div
              className={`d-flex align-items-center panel__joystick-open ${
                isOutputGateExitOpened ? "_active" : ""
              }`}
              onClick={() => openGate(GatesIds.OUTPUT, GatesVectors.EXIT)}
            >
              <div className="triangle panel__joystick-open-btn"></div>
              <span
                className="panel__joystick-open-text"
                style={{ fontWeight: 700, fontSize: "0.85rem" }}
              >
                Выезд
              </span>
            </div>
          </div>
        </div>

        {/* <div className="row mt-5">
          <div className="col-md-12">
            <SwitchBox
              name="door1"
              label="Шлагбаум №1"
              className="panel__form-field"
              disabled={isInputGateFreezed || !isManualMode}
              isChecked={!isInputGateOpened}
              setChecked={() =>
                isInputGateOpened
                  ? closeGate(GatesIds.INPUT)
                  : openGate(GatesIds.INPUT)
              }
            />
          </div>
        </div>
        <div className="row mt-3">
          <div className="col-md-12">
            <SwitchBox
              name="door2"
              label="Шлагбаум №2"
              className="panel__form-field"
              disabled={isOutputGateFreezed || !isManualMode}
              isChecked={!isOutputGateOpened}
              setChecked={() =>
                isOutputGateOpened
                  ? closeGate(GatesIds.OUTPUT)
                  : openGate(GatesIds.OUTPUT)
              }
            />
          </div>
        </div> */}
        <div className="row mt-4">
          <div className="col-md-12">
            {/* <div onClick={openModalEnter}> */}
            <Button
              label="Создать запись на въезд"
              variant="success"
              className="panel__btn"
              disabled={!isManualMode}
              onClick={openModalEnter}
            />
            {/* </div> */}
          </div>
        </div>
        <div className="row mt-3">
          <div className="col-md-12">
            <Button
              label="Создать запись на выезд"
              variant="danger"
              className="panel__btn"
              disabled={!isManualMode}
              onClick={openModalExit}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Panel;
