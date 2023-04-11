import React, { useEffect, useLayoutEffect, useState } from "react";
import { Provider, useSelector } from "react-redux";
import EnterModal from "../Modal/EnterModal";
import ExitModal from "../Modal/ExitModal";
import useActions from "../../hooks/useActions";
import { Loader, Placeholder } from "rsuite";
import Sidebar from "./Sidebar";

const MainLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isMobileMenuVisible, setIsMobileMenuVisible] = useState(false);
  const enterModal = useSelector((store) => store.modal.modalEnter);
  const exitModal = useSelector((store) => store.modal.modalExit);
  const isModalEnterVisible = enterModal.opened;
  const isModalExitVisible = exitModal.opened;

  const [isSettingsInited, setSettingInited] = useState(false);
  const { fetchSettings } = useActions();
  const settingsStore = useSelector((store) => store.settings);
  useEffect(() => {
    if (settingsStore !== null) {
      setSettingInited(true);
    }
  }, [settingsStore]);

  useLayoutEffect(() => {
    fetchSettings();
  }, []);

  return (
    <div className="app">
      {isModalEnterVisible && <EnterModal />}
      {isModalExitVisible && <ExitModal />}

      <div className="container-fluid h-100">
        <div className="row h-100">
          <div
            className="col-xl-2 col-lg-2 col-md-1"
            style={{ paddingLeft: "0" }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 30 30"
              width={30}
              height={30}
              color="#11a8ab"
              focusable="false"
              className="d-xl-none d-lg-none d-md-block m-auto mt-5"
              style={{ cursor: "pointer" }}
              onClick={() => setIsMobileMenuVisible(true)}
            >
              <path
                stroke="currentColor"
                strokeWidth={2}
                strokeLinecap="round"
                strokeMiterlimit={10}
                d="M4 7h22M4 15h22M4 23h22"
              />
            </svg>
            <Sidebar
              isMobileMenuVisible={isMobileMenuVisible}
              setIsMobileMenuVisible={setIsMobileMenuVisible}
            />
          </div>
          <div className="col-xl-10 col-lg-10 col-md-11">
            <div className="content h-100">
              {!isSettingsInited ? (
                <div>
                  {/* <Placeholder.Paragraph rows={8} /> */}
                  <Loader
                    backdrop
                    content="Загрузка..."
                    vertical
                    style={{ background: "transparent" }}
                  />
                </div>
              ) : (
                children
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainLayout;
