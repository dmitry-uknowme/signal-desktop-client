import React from 'react';
import Button from 'renderer/components/base/Button';

const SettingsPage = () => (
  <>
    <div className="row h-100">
      <div className="col-md-12 h-100">
        <div className="row h-100">
          <div className="col-md-12 h-100">
            <div className="settings h-100">
              <div className="row align-items-center">
                <div className="col-md-3">Адрес сервера</div>
                <div className="col-md-4">
                  <input className="w-100" placeholder="127.0.0.1:2211" />
                </div>
                <div className="col-md-5">
                  <Button label="Проверить соединение" variant="check" />
                </div>
              </div>
              <div className="row mt-5">
                <div className="col-md-3">ID клиента</div>
                <div className="col-md-9">
                  <textarea
                    className="settings__client-id"
                    rows="5"
                    value="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c"
                  />
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
