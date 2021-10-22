import React, { useEffect } from 'react';
import { BrowserRouter, Switch, Route, Link } from 'react-router-dom';
import { Provider, useSelector } from 'react-redux';
import store from './store';
import PanelPage from './pages/PanelPage';
import SettingsPage from './pages/SettingsPage';
import StatisticsPage from './pages/StatisticsPage';
import EnterModal from './components/Modal/EnterModal';
import ExitModal from './components/Modal/ExitModal';
import './styles/bootstrap.global.css';
import './styles/App.global.css';

const App = () => {
  return (
    <Provider store={store}>
      <div className="app">
        <EnterModal />
        <ExitModal />
        <BrowserRouter>
          <div className="container-fluid h-100">
            <div className="row h-100">
              <div className="col-md-2">
                <div className="sidebar h-100">
                  <h2 className="sidebar__title">Меню</h2>
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
              <div className="col-md-10">
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
    </Provider>
  );
};

export default App;
