import React from 'react';
import Button from 'renderer/components/base/Button';
import DateRangeIcon from '@mui/icons-material/DateRange';

const StatisticsPage = () => {
  return (
    // <div className="stats-page">
    <div className="row">
      <div className="col-md-12">
        <div className="stats">
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
                  <tr>
                    <td>г777ос02</td>
                    <td>Иванов И. И.</td>
                    <td>1500</td>
                    <td>Большая</td>
                    <td>500</td>
                    <td>Бытовые отходы</td>
                    <td>Бытовые отходы</td>
                    <td>01.01.21 00:00</td>
                    <td>01.01.21 01:00</td>
                    <td>На территории</td>
                  </tr>
                  <tr>
                    <td>г777ос02</td>
                    <td>Иванов И. И.</td>
                    <td>1500</td>
                    <td>Большая</td>
                    <td>500</td>
                    <td>Бытовые отходы</td>
                    <td>Бытовые отходы</td>
                    <td>01.01.21 00:00</td>
                    <td>01.01.21 01:00</td>
                    <td>На территории</td>
                  </tr>
                  <tr>
                    <td>г777ос02</td>
                    <td>Иванов И. И.</td>
                    <td>1500</td>
                    <td>Большая</td>
                    <td>500</td>
                    <td>Бытовые отходы</td>
                    <td>Бытовые отходы</td>
                    <td>01.01.21 00:00</td>
                    <td>01.01.21 01:00</td>
                    <td>На территории</td>
                  </tr>
                  <tr>
                    <td>г777ос02</td>
                    <td>Иванов И. И.</td>
                    <td>1500</td>
                    <td>Большая</td>
                    <td>500</td>
                    <td>Бытовые отходы</td>
                    <td>Бытовые отходы</td>
                    <td>01.01.21 00:00</td>
                    <td>01.01.21 01:00</td>
                    <td>На территории</td>
                  </tr>
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
