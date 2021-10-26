import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Button from '../base/Button';
import SwitchBox from '../base/Switch';
import {
  setIsModalEnterOpened,
  setIsModalExitOpened,
} from '../../store/reducers/modalReducer';

import { setIsManualMode } from '../../store/reducers/controlsReducer';

const Panel = () => {
  const dispatch = useDispatch();

  const isManualMode = useSelector((store) => store.controls.isManualMode);
  const isDoor1Opened = useSelector((store) => store.controls.door1);
  const isDoor2Opened = useSelector((store) => store.controls.door2);

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

  return (
    <div className="panel h-100">
      <h2 className="panel__title">Панель управления</h2>

      <div className="panel__form">
        <div className="row mt-3">
          <div className="col-md-12">
            <SwitchBox
              name="manual_mode"
              label="Ручное управление"
              isChecked={isManualMode}
              setChecked={() => dispatch(setIsManualMode())}
            />
          </div>
        </div>
        <div className="row mt-5">
          <div className="col-md-12">
            <SwitchBox
              name="door1"
              label="Шлагбаум №1"
              disabled={!isManualMode}
            />
          </div>
        </div>
        <div className="row mt-3">
          <div className="col-md-12">
            <SwitchBox
              name="door2"
              label="Шлагбаум №2"
              disabled={!isManualMode}
            />
          </div>
        </div>
        <div className="row mt-4">
          <div className="col-md-12">
            <Button
              label="Создать запись на въезд"
              variant="success"
              disabled={!isManualMode}
              onClick={openModalEnter}
            />
          </div>
        </div>
        <div className="row mt-3">
          <div className="col-md-12">
            <Button
              label="Создать запись на выезд"
              variant="danger"
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
