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
    dispatch(setIsModalEnterOpened(true));
  };

  const openModalExit = () => {
    dispatch(
      setIsModalExitOpened({
        weight: 700,
        // autos: [{ id: 1, number_plate: 'о777оо77' }],
      })
    );
  };

  return (
    <div className="panel h-100">
      <h2 className="panel__title">Панель управления</h2>

      <div className="panel__form">
        <div className="row mt-3">
          <div className="col-md-6">
            <SwitchBox
              name="manual_mode"
              label="Ручное управление"
              isChecked={isManualMode}
              setChecked={() => dispatch(setIsManualMode())}
            />
          </div>
        </div>
        <div className="row mt-5">
          <div className="col-md-6">
            <SwitchBox
              name="door1"
              label="Шлагбаум №1"
              disabled={!isManualMode}
            />
          </div>
        </div>
        <div className="row mt-3">
          <div className="col-md-6">
            <SwitchBox
              name="door2"
              label="Шлагбаум №2"
              disabled={!isManualMode}
            />
          </div>
        </div>
        <div className="row mt-3">
          <div className="col-md-8">
            <Button
              label="Создать запись на въезд"
              variant="success"
              disabled={!isManualMode}
              onClick={openModalEnter}
            />
          </div>
        </div>
        <div className="row mt-3">
          <div className="col-md-8">
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
