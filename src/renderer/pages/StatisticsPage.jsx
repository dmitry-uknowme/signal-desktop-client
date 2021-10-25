import React, { useState, useEffect } from 'react';
import Button from 'renderer/components/base/Button';
import DateRangeIcon from '@mui/icons-material/DateRange';

const StatisticsPage = () => {
  const [allCars, setAllCars] = useState(null);
  const fetchAllCars = async () => {
    fetch('http://localhost:8000/all_cars')
      .then((response) => response.json())
      .then((res) => setAllCars(res))
      .catch((e) => console.log('error', e));
  };
  useEffect(() => {
    fetchAllCars();
  }, []);
  return (
    // <div className="stats-page">
    <div className="row h-100">
      <div className="col-md-12 h-100">
        <div className="stats h-100">
          {/* <div className="row"> */}
          <h2 className="stats__title p-0">Статистика</h2>
          {/* </div> */}
          <div className="row mt-3 align-items-center">
            <div className="container">
              <div className="stats__filters p-0 d-flex justify-content-between">
                <select className="stats__filter">
                  <option>Категория груза</option>
                </select>
                <select className="stats__filter">
                  <option>Вид груза</option>
                </select>
                <select className="stats__filter">
                  <option>Контрагент</option>
                </select>
                <select className="stats__filter">
                  <option>Гос. номер</option>
                </select>
                <DateRangeIcon className="stats__date-picker" />
                <Button variant="success" label="Применить" />
                <Button variant="danger" label="Сбросить" />
              </div>
            </div>
          </div>
          <div className="row mt-4">
            <div className="container">
              <table className="stats__table">
                <thead>
                  <tr>
                    <th>Гос. номер</th>
                    <th>Перевозчик</th>
                    <th>Брутто</th>
                    <th>Тара</th>
                    <th>Нетто</th>
                    <th>Категория</th>
                    <th>Вид груза</th>
                    <th>Дата и время въезда</th>
                    <th>Дата и время выезда</th>
                    <th>Статус</th>
                  </tr>
                </thead>
                <tbody>
                  {allCars?.map(
                    ({
                      id,
                      number_plate,
                      transporter_company,
                      weight_brutto,
                      result_weight,
                      weight_netto,
                      cargo_category,
                      cargo_type,
                      date_of_enter,
                      date_of_exit,
                      status,
                    }) => (
                      <tr key={id}>
                        <td>{number_plate}</td>
                        <td>{transporter_company}</td>
                        <td>{weight_brutto}</td>
                        <td>{result_weight}</td>
                        <td>{weight_netto}</td>
                        <td>{cargo_category}</td>
                        <td>{cargo_type}</td>
                        <td>{date_of_enter}</td>
                        <td>{date_of_exit}</td>
                        <td>{status}</td>
                      </tr>
                    )
                  )}
                </tbody>
              </table>
            </div>
          </div>
          <div className="row mt-5">
            <div className="stats__summary text-uppercase font-bold">
              Итого: 356 тонн (95 взвешиваний)
            </div>
          </div>
        </div>
      </div>
    </div>
    // </div>
  );
};

export default StatisticsPage;
