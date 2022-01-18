import React, { useState, useEffect } from 'react';
import { formatISO, formatDistanceToNow } from 'date-fns';
import { ru } from 'date-fns/locale';
import Panel from '../components/Panel';
import StateTable from '../components/StateTable';
import TerritoryTable from '../components/TerritoryTable';

const PanelPage = () => {
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [lastRefreshDate, setLastRefreshDate] = useState(Date.now());
  // console.log('date', formatISO(lastRefreshDate, { representation: 'time' }));
  const [distanceToNow, setDistanceToNow] = useState(
    formatDistanceToNow(lastRefreshDate, { locale: ru, addSuffix: true })
  );
  const [hardwareState, setHardwareState] = useState();

  const fetchHardwareState = async () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setHardwareState([
        {
          name: 'Связь с сервером',
          status: 'online',
        },
        {
          name: 'Шлагбаум №1',
          status: 'offline',
        },
        {
          name: 'Шлагбаум №2',
          status: 'offline',
        },
        {
          name: 'Камера №1',
          status: 'offline',
        },
        {
          name: 'Камера №2',
          status: 'offline',
        },
        {
          name: 'Весовой терминал',
          status: 'online',
        },
        {
          name: 'RFID',
          status: 'error',
        },
      ]);
      setIsRefreshing(false);
      setLastRefreshDate(Date.now());
    }, 500);
  };

  useEffect(() => {
    setLastRefreshDate(Date.now());

    fetchHardwareState();
  }, []);

  useEffect(() => {
    setDistanceToNow(
      formatDistanceToNow(lastRefreshDate, { locale: ru, addSuffix: true })
    );
    let timer = setInterval(() => {
      setDistanceToNow(
        formatDistanceToNow(lastRefreshDate, { locale: ru, addSuffix: true })
      );
    }, 60000);
    return () => clearInterval(timer);
  }, [lastRefreshDate]);

  return (
    <>
      <div className="row panel__row1">
        <div className="col-xl-5 col-lg-5 col-md-4">
          <Panel />
        </div>
        <div className="col-xl-7 col-lg-7 col-md-8">
          <div className="state h-100">
            <div className="row align-items-center">
              <div className="col-xl-9 col-md-9">
                <h2 className="state__title">Состояние оборудования</h2>
              </div>
              <div className="col-xl-2 col-md-1">
                <svg
                  className="state__refresh"
                  fill="#e67e22"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 30 30"
                  width="30px"
                  height="30px"
                  onClick={fetchHardwareState}
                  style={{ cursor: 'pointer' }}
                >
                  <path d="M 15 3 C 12.031398 3 9.3028202 4.0834384 7.2070312 5.875 A 1.0001 1.0001 0 1 0 8.5058594 7.3945312 C 10.25407 5.9000929 12.516602 5 15 5 C 20.19656 5 24.450989 8.9379267 24.951172 14 L 22 14 L 26 20 L 30 14 L 26.949219 14 C 26.437925 7.8516588 21.277839 3 15 3 z M 4 10 L 0 16 L 3.0507812 16 C 3.562075 22.148341 8.7221607 27 15 27 C 17.968602 27 20.69718 25.916562 22.792969 24.125 A 1.0001 1.0001 0 1 0 21.494141 22.605469 C 19.74593 24.099907 17.483398 25 15 25 C 9.80344 25 5.5490109 21.062074 5.0488281 16 L 8 16 L 4 10 z" />
                </svg>
              </div>
            </div>
            <StateTable
              isRefreshing={isRefreshing}
              distanceToNow={distanceToNow}
              data={hardwareState}
            />
          </div>
        </div>
      </div>
      <div className="row panel__row2 mt-3">
        <div className="col-md-12">
          <div className="territory h-100">
            <h2 className="territory__title">На территории</h2>
            <TerritoryTable />
          </div>
        </div>
      </div>
    </>
  );
};

export default PanelPage;
