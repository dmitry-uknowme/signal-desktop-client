import React, { useState } from 'react'
import { BrowserRouter, Switch, Route, Link } from 'react-router-dom'
import { Provider, useSelector } from 'react-redux'
import { AnimatePresence, motion } from 'framer-motion'
import store from './store'
import PanelPage from './pages/PanelPage'
import SettingsPage from './pages/SettingsPage'
import StatisticsPage from './pages/StatisticsPage'
import EnterModal from './components/Modal/EnterModal'
import ExitModal from './components/Modal/ExitModal'
import './styles/rsuite.global.css'
import './styles/bootstrap.global.css'
import './styles/App.global.css'

const App = () => {
  const animationVariants = {
    menu: {
      show: { x: '-5%' },
      hide: { x: '-140%' },
    },
  }
  const [isMobileMenuVisible, setIsMobileMenuVisible] = useState(false)
  const modal = useSelector(store => store.modal.modalEnter)
  const isModalVisible = modal.opened
  return (
    <div className="app">
      {/*  <AnimatePresence> */}
      {isModalVisible && <EnterModal />}
      {/* </AnimatePresence> */}

      <ExitModal />
      <BrowserRouter>
        <div className="container-fluid h-100">
          <div className="row h-100">
            <div
              className="col-xl-2 col-lg-2 col-md-1"
              style={{ paddingLeft: '0' }}
            >
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
              <motion.div
                className="sidebar h-100 d-xl-none d-lg-none d-md-block"
                animate={isMobileMenuVisible ? 'show' : 'hide'}
                variants={animationVariants.menu}
              >
                <h2 className="sidebar__title">
                  Signal Client
                  <svg
                    enableBackground="new 0 0 32 32"
                    id="Слой_1"
                    version="1.1"
                    viewBox="0 0 32 32"
                    xmlSpace="preserve"
                    xmlns="http://www.w3.org/2000/svg"
                    xmlnsXlink="http://www.w3.org/1999/xlink"
                    className="sidebar__back"
                    onClick={() => setIsMobileMenuVisible(false)}
                  >
                    <path
                      clipRule="evenodd"
                      d="M32,16.009c0-0.267-0.11-0.522-0.293-0.714  l-9.899-9.999c-0.391-0.395-1.024-0.394-1.414,0c-0.391,0.394-0.391,1.034,0,1.428l8.193,8.275H1c-0.552,0-1,0.452-1,1.01  s0.448,1.01,1,1.01h27.586l-8.192,8.275c-0.391,0.394-0.39,1.034,0,1.428c0.391,0.394,1.024,0.394,1.414,0l9.899-9.999  C31.894,16.534,31.997,16.274,32,16.009z"
                      fill="#fff"
                      fillRule="evenodd"
                      id="Arrow_Forward"
                    />
                  </svg>
                </h2>
                <div className="sidebar__menu">
                  <Link to="/" style={{ textDecoration: 'none' }}>
                    <div className="sidebar__item">Панель управления</div>
                  </Link>
                  <Link to="/statistics" style={{ textDecoration: 'none' }}>
                    <div className="sidebar__item">Статистика</div>
                  </Link>
                  <Link to="/settings" style={{ textDecoration: 'none' }}>
                    <div className="sidebar__item">Настройки</div>
                  </Link>
                </div>
              </motion.div>
              <div className="sidebar h-100 d-xl-block d-lg-block d-md-none">
                <h2 className="sidebar__title">Signal Client</h2>
                <div className="sidebar__menu">
                  <Link to="/" style={{ textDecoration: 'none' }}>
                    <div className="sidebar__item">Панель управления</div>
                  </Link>
                  <Link to="/statistics" style={{ textDecoration: 'none' }}>
                    <div className="sidebar__item">Статистика</div>
                  </Link>
                  <Link to="/settings" style={{ textDecoration: 'none' }}>
                    <div className="sidebar__item">Настройки</div>
                  </Link>
                </div>
              </div>
            </div>
            <div className="col-xl-10 col-lg-10 col-md-11">
              <div className="content h-100">
                <Switch>
                  <Route exact path="/settings">
                    <SettingsPage />
                  </Route>
                  <Route exact path="/statistics">
                    <StatisticsPage />
                  </Route>

                  <Route path="/">
                    <PanelPage />
                  </Route>
                </Switch>
              </div>
            </div>
          </div>
        </div>
      </BrowserRouter>
    </div>
  )
}

export default App
