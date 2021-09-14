import React from 'react';
import Panel from '../components/Panel';
import StateTable from '../components/StateTable';
import TerritoryTable from '../components/TerritoryTable';

const PanelPage = () => (
  <>
    <div className="row">
      <div className="col-md-6">
        <Panel />
      </div>
      <div className="col-md-6">
        <div className="state">
          <h2 className="state__title">Состояние оборудования</h2>
          <StateTable />
        </div>
      </div>
    </div>
    <div className="row mt-5">
      <div className="col-md-12">
        <div className="territory">
          <h2 className="territory__title">На территории</h2>
          <TerritoryTable />
        </div>
      </div>
    </div>
  </>
);

export default PanelPage;
