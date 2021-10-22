import React from 'react';
import Button from '../base/Button';
import SwitchBox from '../base/Switch';
import RefreshIcon from '../../images/refresh-icon.svg';

const Panel = () => {
  return (
    <div className="panel h-100">
      <h2 className="panel__title">Панель управления</h2>

      <div className="panel__form">
        <div className="row mt-3">
          <div className="col-md-6">
            <SwitchBox name="manual" label="Ручное управление" />
          </div>
        </div>
        <div className="row mt-5">
          <div className="col-md-6">
            <SwitchBox name="door1" label="Шлагбаум №1" />
          </div>
        </div>
        <div className="row mt-3">
          <div className="col-md-6">
            <SwitchBox name="door2" label="Шлагбаум №2" />
          </div>
        </div>
        <div className="row mt-3">
          <div className="col-md-8">
            <Button label="Создать запись на въезд" variant="success" />
          </div>
        </div>
        <div className="row mt-3">
          <div className="col-md-8">
            <Button label="Создать запись на выезд" variant="danger" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Panel;
