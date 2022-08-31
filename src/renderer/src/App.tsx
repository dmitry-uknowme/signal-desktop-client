import React, { useContext, useEffect, useState } from 'react'
import { BrowserRouter, Routes, Route, Link, Navigate } from 'react-router-dom'
import { Provider, useSelector } from 'react-redux'
import { AnimatePresence, motion } from 'framer-motion'
import store from './store'
import PanelPage from './pages/PanelPage'
import SettingsPage from './pages/SettingsPage'
import StatisticsPage from './pages/StatisticsPage'
import EnterModal from './components/Modal/EnterModal'
import ExitModal from './components/Modal/ExitModal'
import useActions from './hooks/useActions'
import CameraPage from './pages/CameraPage'
import CentrifugeProvider from './context/centrifuge/ContextProvider'
import Sidebar from './components/Sidebar'
import 'react-toastify/dist/ReactToastify.css'
import './styles/rsuite.global.css'
import './styles/bootstrap.global.css'
import './styles/App.global.css'

// import centrifuge, { Centrifuge } from 'centrifuge'
// const socket = io('http://localhost:8080')
// import settings from '../settings.json'
// console.log('settings', settings)
const App: React.FC = () => {
  const [isMobileMenuVisible, setIsMobileMenuVisible] = useState(false)
  const enterModal = useSelector((store) => store.modal.modalEnter)
  const exitModal = useSelector((store) => store.modal.modalExit)
  const isModalEnterVisible = enterModal.opened
  const isModalExitVisible = exitModal.opened
  useEffect(() => {
    // window.alert('version 1')
    // socket.on('TRUCK:ENTERED', data => {
    //   console.log('entered', data)
    //   addCarOnTerritory(data.payload, true)
    // })
    // socket.on('TRUCK:EXITED', data => {
    //   console.log('exited', data)
    //   removeCarFromTerritory(data.payload, true)
    // })
    // centrifuge.on('connected', function (ctx) {
    //   console.log('connected', ctx)
    // })
    // centrifuge.on('disconnected', function (ctx) {
    //   console.log('disconnected', ctx)
    // })
    // const TRUCK_ENTERED_CHANNEL = centrifuge.subscribe('TRUCK:ENTERED', (ctx) =>
    //   addCarOnTerritory(ctx.payload, true)
    // )
    // const TRUCK_EXITED_CHANNEL = centrifuge.subscribe('TRUCK:EXITED', (ctx) =>
    //   removeCarFromTerritory(ctx.payload, true)
    // )
    // centrifuge.connect()
    // return (): void => {
    //   // TRUCK_ENTERED_CHANNEL.unsubscribe()
    //   // TRUCK_EXITED_CHANNEL.unsubscribe()
    //   return centrifuge.disconnect()
    // }
    // console.log('ccc', new centrifuge('ws://192.168.31.244:8877/connection/websocket'))
  }, [])
  return (
    <div className="app">
      <CentrifugeProvider>
        {isModalEnterVisible && <EnterModal />}
        {isModalExitVisible && <ExitModal />}

        <BrowserRouter>
          <div className="container-fluid h-100">
            <div className="row h-100">
              <div className="col-xl-2 col-lg-2 col-md-1" style={{ paddingLeft: '0' }}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 30 30"
                  width={30}
                  height={30}
                  color="#11a8ab"
                  focusable="false"
                  className="d-xl-none d-lg-none d-md-block m-auto mt-5"
                  style={{ cursor: 'pointer' }}
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
                  <Routes>
                    <Route path="/" element={<PanelPage />}></Route>
                    <Route path="/settings" element={<SettingsPage />}></Route>
                    <Route path="/statistics" element={<StatisticsPage />}></Route>
                    <Route path="/camera" element={<CameraPage />}></Route>
                    <Route path="*" element={<Navigate to="/" replace />} />
                  </Routes>
                </div>
              </div>
            </div>
          </div>
        </BrowserRouter>
      </CentrifugeProvider>
    </div>
  )
}

export default App
