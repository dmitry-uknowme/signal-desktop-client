import React from 'react';
import { BrowserRouter, Switch, Route, Link } from 'react-router-dom';
import PanelPage from './pages/PanelPage';
import SettingsPage from './pages/SettingsPage';
import './styles/bootstrap.global.css';
import './styles/App.global.css';

const App = () => {
  return (
    <div className="app">
      <BrowserRouter>
        <div className="container-fluid h-100">
          <div className="row h-100">
            <div className="col-md-3 d-flex justify-content-center align-items-center">
              <div className="sidebar">
                <div className="sidebar__menu">
                  <Link to="/">
                    <div className="sidebar__item">Панель управления</div>
                  </Link>
                  <Link to="/statistics">
                    <div className="sidebar__item">Статистика</div>
                  </Link>
                  <Link to="/settings">
                    <div className="sidebar__item">Настройки</div>
                  </Link>
                </div>
              </div>
            </div>
            <div
              className="col-md-9" /* d-flex justify-content-center align-items-center */
            >
              <div className="content">
                <Switch>
                  <Route exact path="/settings">
                    <SettingsPage />
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
  );
};

export default App;
