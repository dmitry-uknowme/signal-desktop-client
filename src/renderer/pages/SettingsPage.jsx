import React from 'react';
import Button from 'renderer/components/base/Button';

const SettingsPage = () => (
  <>
    <div className="row">
      <div className="col-md-12">
        <div className="row">
          <div className="col-md-10">
            <div className="settings">
              <div className="row align-items-center">
                <div className="col-md-4">Адрес сервера</div>
                <div className="col-md-4">
                  <input className="w-100" placeholder="127.0.0.1:2211" />
                </div>
                <div className="col-md-4">
                  <Button label="Проверить соединение" variant="success" />
                </div>
              </div>
              <div className="row mt-5">
                <div className="col-md-3">ID клиента</div>
                <div className="col-md-9">
                  <textarea name="" id="" cols="30" rows="10" />
                </div>
              </div>
              <div className="row mt-5">
                <div className="col-md-12">
                  <div className="settings__logs">Логи подключений</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </>
);

export default SettingsPage;
