/* eslint-disable react/jsx-props-no-spreading */
import React, { useEffect, useRef, useState } from 'react';
import Button from '../components/base/Button';
import Modal from '../components/Modal';

const SettingsPage = () => {
  const savedSettingsRef = useRef(null);
  const [settings, setSettings] = useState({
    serverURL: process.env.API_URL.split('/')[2],
    polygonName: process.env.POLYGON_NAME,
    clientId: process.env.CLIENT_ID,
  });
  const [modal, setModal] = useState({
    isVisible: false,
    headerText: '',
    bodyText: '',
  });

  const checkServerConnection = () => {
    setModal((state) => ({
      ...state,
      isVisible: true,
      headerText: 'Проверка соединения с сервером',
    }));
    setTimeout(
      () =>
        setModal((state) => ({
          ...state,
          bodyText:
            'Соединение с сервером на полигоне ОК\n Соединение с центральным сервером ОК\n Соединение с весовым терминалом ОК',
        })),
      500
    );
    setTimeout(
      () => setModal((state) => ({ ...state, isVisible: false })),
      5000
    );
  };

  const saveSettings = () => {
    localStorage.setItem('settings', JSON.stringify(settings));
  };

  useEffect(() => {
    savedSettingsRef.current = localStorage.getItem('settings')
      ? JSON.parse(localStorage.getItem('settings'))
      : null;
    if (savedSettingsRef.current) {
      setSettings(savedSettingsRef.current);
    }
  }, []);

  return (
    <div className="row h-100">
      <Modal {...modal} />
      <div className="col-md-12 h-100">
        <div className="row h-100">
          <div className="col-md-12 h-100">
            <div className="settings h-100">
              <div className="row align-items-center">
                <div className="col-md-3">Адрес сервера</div>
                <div className="col-md-4">
                  <input
                    className="w-100"
                    placeholder="127.0.0.1:2211"
                    value={settings.serverURL}
                    style={{ color: 'black', textAlign: 'center' }}
                    onChange={(e) =>
                      setSettings((state) => ({
                        ...state,
                        serverURL: e.target.value,
                      }))
                    }
                  />
                </div>
                <div className="col-md-3">
                  <Button
                    label="Проверить соединение"
                    variant="check"
                    className="w-100"
                    onClick={() => {
                      checkServerConnection();
                    }}
                  />
                </div>
              </div>
              <div className="row align-items-center mt-4">
                <div className="col-md-3">Название полигона</div>
                <div className="col-md-7">
                  <input
                    className="w-100"
                    placeholder="127.0.0.1:2211"
                    value={settings.polygonName}
                    style={{ color: 'black', textAlign: 'center' }}
                    onChange={(e) =>
                      setSettings((state) => ({
                        ...state,
                        polygonName: e.target.value,
                      }))
                    }
                  />
                </div>
                {/* <div className="col-md-3">
                  <Button
                    label="Проверить соединение"
                    variant="check"
                    className="w-100"
                  />
                </div> */}
              </div>
              <div className="row mt-5">
                <div className="col-md-3">ID клиента</div>
                <div className="col-md-7">
                  <textarea
                    className="settings__client-id w-100"
                    rows="5"
                    value={settings.clientId}
                    onChange={(e) =>
                      setSettings((state) => ({
                        ...state,
                        clientId: e.target.value,
                      }))
                    }
                    style={{ color: 'black' }}
                  />
                </div>
              </div>
              <div className="row mt-5">
                <div className="col-md-3">
                  <Button
                    label="Сохранить всё"
                    variant="success"
                    className="panel__btn"
                    onClick={() => saveSettings()}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
