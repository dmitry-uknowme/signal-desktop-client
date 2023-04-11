import { useEffect, useRef, useState } from "react";
import Modal from "../theme/Modal";
// import { Button } from "rsuite";
import Button from "../theme/base/Button";
// import Button from "../theme/base/Button";
import MainLayout from "../theme/layout/MainLayout";
import useActions from "../hooks/useActions";
import { useSelector } from "react-redux";
import { ISettings } from "../store/reducers/settingsReducer";

const SettingsPage = () => {
  const { fetchSettings, changeSettings } = useActions();
  const savedSettingsRef = useRef(null);

  const settingsStore: ISettings = useSelector((store) => store.settings);

  const [settings, setSettings] = useState<ISettings>(settingsStore);
  const [modal, setModal] = useState({
    isVisible: false,
    headerText: "",
    bodyText: "",
  });

  const saveSettings = () => {
    console.log("savvvving", { ...settings });
    changeSettings(JSON.stringify({ ...settings }));
    setTimeout(() => {
      fetchSettings(true);
    }, 200);
  };

  useEffect(() => {
    setSettings(settingsStore);
  }, [settingsStore]);

  console.log("sss", settings, settingsStore);

  return (
    <MainLayout>
      <div className="row h-100">
        <Modal {...modal} />
        <div className="col-md-12 h-100">
          <div className="row h-100">
            <div className="col-md-12 h-100">
              <div className="settings h-100">
                <div className="row">
                  <div className="col-xl-9 col-md-9">
                    <h2 className="state__title">Настройки приложения</h2>
                  </div>
                </div>
                <div className="row align-items-center mt-4">
                  <div className="col-md-3">Адрес сервера</div>
                  <div className="col-md-4">
                    <input
                      className="w-100"
                      placeholder={settings.API_URL}
                      value={settings.API_URL}
                      style={{ color: "black", textAlign: "center" }}
                      onChange={(e) =>
                        setSettings((state) => ({
                          ...state,
                          API_URL: e.target.value,
                        }))
                      }
                    />
                  </div>
                  <div className="col-md-3">
                    <Button
                      label="Проверить соединение"
                      variant="check"
                      className="w-100"
                      //   onClick={() => {
                      //     checkServerConnection();
                      //   }}
                    />
                  </div>
                </div>
                <div className="row align-items-center mt-4">
                  <div className="col-md-3">Название полигона</div>
                  <div className="col-md-7">
                    <input
                      className="w-100"
                      placeholder={settings.POLYGON_NAME}
                      value={settings.POLYGON_NAME}
                      style={{ color: "black", textAlign: "center" }}
                      onChange={(e) =>
                        setSettings((state) => ({
                          ...state,
                          POLYGON_NAME: e.target.value,
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
                      value={settings.POLYGON_ID}
                      onChange={(e) =>
                        setSettings((state) => ({
                          ...state,
                          POLYGON_ID: e.target.value,
                        }))
                      }
                      style={{ color: "black" }}
                    />
                  </div>
                </div>
                <div className="row mt-5">
                  <div className="col-md-3 offset-md-3">
                    <div className="d-block" onClick={() => saveSettings()}>
                      <Button
                        type={"button"}
                        label="Сохранить всё"
                        variant="success"
                        className="panel__btn"
                      />
                    </div>
                  </div>
                  <div className="col-md-3 offset-md-1">
                    <Button
                      label="Настройки по умолчанию"
                      variant="danger"
                      className="panel__btn"
                      onClick={
                        () => {
                          //   () =>
                          //     changeSettingsByKey("API_URL", process.env.API_URL);
                          //   () =>
                          //     changeSettingsByKey(
                          //       "POLYGON_NAME",
                          //       process.env.POLYGON_NAME
                          //     );
                          //   () =>
                          //     changeSettingsByKey(
                          //       "POLYGON_ID",
                          //       process.env.POLYGON_ID
                          //     );
                          // window.location.reload()
                        }
                        // setSettings({
                        //   serverURL: (process.env.API_URL as string)?.split('/')[2],
                        //   polygonName: process.env.POLYGON_NAME,
                        //   clientId: process.env.CLIENT_ID
                        // })
                      }
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default SettingsPage;
