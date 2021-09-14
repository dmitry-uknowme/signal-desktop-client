import React from 'react';

const Panel = () => {
  return (
    <div className="panel">
      <h2 className="panel__title">Панель управления</h2>
      <div className="panel__form">
        <div className="row mt-3">
          <div className="col-md-6">
            <div className="form-check form-switch">
              <label
                className="form-check-label"
                htmlFor="flexSwitchCheckDefault"
              >
                Ручное управление
              </label>
              <input
                className="form-check-input"
                type="checkbox"
                id="flexSwitchCheckDefault"
                checked
              />
            </div>
          </div>
        </div>
        <div className="row mt-5">
          <div className="col-md-6">
            <div class="form-check form-switch">
              <label class="form-check-label" for="flexSwitchCheckDefault">
                Шлагбаум №1
              </label>
              <input
                class="form-check-input"
                type="checkbox"
                id="flexSwitchCheckDefault"
              />
            </div>
          </div>
        </div>
        <div className="row mt-3">
          <div className="col-md-6">
            <div class="form-check form-switch">
              <label class="form-check-label" for="flexSwitchCheckDefault">
                Шлагбаум №2
              </label>
              <input
                class="form-check-input"
                type="checkbox"
                id="flexSwitchCheckDefault"
              />
            </div>
          </div>
        </div>
        <div className="row mt-3">
          <div className="col-md-6">
            <div className="btn btn-success" style={{ fontSize: '0.7rem' }}>
              Создать запись на въезд
            </div>
          </div>
        </div>
        <div className="row mt-3">
          <div className="col-md-6">
            <div className="btn btn-danger" style={{ fontSize: '0.7rem' }}>
              Создать запись на выезд
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Panel;
