import React from 'react';

const SettingsPage = () => (
  <>
    <div className="row">
      <div className="col-md-12">
        <div className="row">
          <div className="col-md-9">
            <div className="row">
              <div className="col-md-3">Адрес сервера</div>
              <div className="col-md-4">
                <input placeholder="127.0.0.1:2211" />
              </div>
              <div className="col-md-4">
                <div className="btn btn-primary" style={{ fontSize: '0.8rem' }}>
                  Проверить соединение
                </div>
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
  </>
);

export default SettingsPage;
