/* eslint-disable no-nested-ternary */
import React, { useState, useEffect } from 'react';
import Button from 'renderer/components/base/Button';
import ruRu from 'rsuite/locales/ru_RU';
import useActions from 'renderer/hooks/useActions';
import { useSelector } from 'react-redux';
import { DateRangePicker, CustomProvider } from 'rsuite';
import axios from 'axios';

const StatisticsPage = () => {
  const [contractors, setContractors] = useState();
  const [cargoCategories, setCargoCategories] = useState();
  const [cargoTypes, setCargoTypes] = useState();
  const [totalWeight, setTotalWeight] = useState();
  const { fetchAllCars } = useActions();
  const allCars = useSelector((store) => store.cars.all.items);

  // const changeDateHandler = (e) => {
  //   console.log('calendar', e);
  // };

  // const fetchDropdownFields = async () => {
  //   const contractorResponse = await axios.get(
  //     'http://localhost:8000/contractors'
  //   );
  //   setContractors(contractorResponse.data);

  //   const cargoCategoriesResponse = await axios.get(
  //     'http://localhost:8000/cargo_categories'
  //   );
  //   setCargoCategories(cargoCategoriesResponse.data);

  //   const cargoTypesResponse = await axios.get(
  //     'http://localhost:8000/cargo_types'
  //   );
  //   setCargoTypes(cargoTypesResponse.data);
  // };
  const fetchDropdownFields = async () => {
    const contractorResponse = await axios.get(
      `${process.env.API_URL}/getOrganizations`
    );
    setContractors(contractorResponse.data.items);

    const cargoCategoriesResponse = await axios.get(
      `${process.env.API_URL}/getCargoCategories`
    );
    setCargoCategories(cargoCategoriesResponse.data.items);

    const cargoTypesResponse = await axios.get(
      `${process.env.API_URL}/getCargoTypes`
    );
    setCargoTypes(cargoTypesResponse.data.items);
  };

  useEffect(() => {
    if (allCars?.length) {
      setTotalWeight(
        allCars.reduce((sum, car) => sum + parseInt(car.weightNetto), 0)
      );
    } else {
      setTotalWeight(0);
    }
  }, [allCars]);

  useEffect(() => {
    fetchAllCars();
    fetchDropdownFields();
  }, []);
  return (
    // <div className="stats-page">
    <div className="row h-100">
      <div className="col-md-12 h-100">
        <div className="stats h-100">
          <h2 className="stats__title p-0">Статистика</h2>
          <div className="row mt-3 align-items-center">
            <div className="container">
              <div className="stats__filters p-0 d-flex justify-content-between">
                <select className="stats__filter">
                  <option value="" disabled>
                    Категория груза
                  </option>
                  {cargoCategories?.map(({ id, title }) => (
                    <option key={id} value={id}>
                      {title}
                    </option>
                  ))}
                </select>
                <select className="stats__filter">
                  <option value="" disabled>
                    Вид груза
                  </option>
                  {cargoTypes?.map(({ id, title }) => (
                    <option key={id} value={id}>
                      {title}
                    </option>
                  ))}
                </select>
                <select className="stats__filter">
                  <option value="" disabled>
                    Контрагент
                  </option>
                  {contractors?.map(({ id, full_name }) => (
                    <option key={id} value={id}>
                      {full_name}
                    </option>
                  ))}
                </select>
                <input
                  className="stats__filter d-xl-block"
                  placeholder="Гос. номер"
                />
                <CustomProvider locale={ruRu}>
                  <DateRangePicker
                    className="stats__filter stats__date-picker d-xl-block"
                    size="sm"
                    // placeholder="Период дат"
                    showOneCalendar
                    placement="bottomEnd"
                    onChange={(e) => console.log('date', e)}
                  />
                </CustomProvider>
                <Button
                  variant="success"
                  label="Применить"
                  className="stats__filter-btn stats__filter-apply d-xl-block d-lg-none d-1300-none d-md-none d-900-none d-sm-none"
                />
                <Button
                  variant="success"
                  label="✓"
                  className="stats__filter-btn stats__filter-btn-icon stats__filter-apply d-xl-none d-lg-block d-1300-block d-md-none d-sm-none"
                />
                <Button
                  variant="danger"
                  label="↻"
                  className="stats__filter-btn stats__filter-btn-icon stats__filter-refresh d-xl-none d-lg-block d-1300-block d-md-none d-sm-none"
                />
                <Button
                  variant="danger"
                  label="Сбросить"
                  className="stats__filter-btn stats__filter-refresh d-xl-block d-lg-none d-1300-none d-md-none d-900-none d-sm-none"
                />
              </div>
              <div className="row d-xl-none d-lg-flex d-md-flex mt-4">
                {/* <div className="col-md-2">
                  <input className="stats__filter" placeholder="Гос. номер" />
                </div> */}
                {/* <div className="col-md-4">
                  <CustomProvider locale={ruRu}>
                    <DateRangePicker
                      className="stats__filter stats__date-picker"
                      size="sm"
                      placeholder="Период дат"
                      showOneCalendar
                      placement="bottomEnd"
                      onChange={(e) => console.log('date', e)}
                    />
                  </CustomProvider>
                </div> */}
                <div className="col-md-2">
                  <Button
                    variant="success"
                    label="Применить"
                    className="stats__filter-btn stats__filter-apply d-xl-none d-lg-none d-md-none d-900-block w-100"
                  />
                </div>
                <div className="col-md-2">
                  <Button
                    variant="danger"
                    label="Сбросить"
                    className="stats__filter-btn stats__filter-refresh d-xl-none d-lg-none d-md-none d-900-block w-100"
                  />
                </div>
              </div>
            </div>
          </div>
          {allCars?.length ? (
            <>
              {' '}
              <div className="row mt-4">
                <div className="container">
                  <table className="stats__table">
                    <thead>
                      <tr>
                        <th>Гос. номер</th>
                        <th>Перевозчик</th>
                        <th>Брутто (г)</th>
                        <th>Тара (г)</th>
                        <th>Нетто (г)</th>
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
                          // id,
                          // number_plate,
                          // transporter_company,
                          // weight_brutto,
                          // result_weight,
                          // weight_netto,
                          // cargo_category,
                          // cargo_type,
                          // date_of_enter,
                          // date_of_exit,
                          // status,
                          id,
                          truck_number,
                          contractor_full_name,
                          weight_gross,
                          weight_container,
                          category_title,
                          type_title,
                          entry_date_time,
                          check_out_date_time,
                          status,
                        }) => (
                          <tr key={id}>
                            <td>{truck_number}</td>
                            <td>{contractor_full_name || 'Не определено'}</td>
                            <td>{weight_gross}</td>
                            <td>{weight_container}</td>
                            <td></td>
                            <td>{category_title || 'Не определено'}</td>
                            <td>{type_title || 'Не определено'}</td>
                            <td>{entry_date_time || 'Не определено'}</td>
                            <td>{check_out_date_time || 'Не определено'}</td>
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
                  Итого: {totalWeight} кг ( {allCars?.length}{' '}
                  {allCars?.length === 1
                    ? 'взвешивание'
                    : allCars?.length % 2 === 0 ||
                      allCars?.length % 3 === 0 ||
                      allCars?.length % 4 === 0
                    ? 'взвешивания'
                    : 'взвешиваний'}{' '}
                  )
                </div>
              </div>
            </>
          ) : (
            ''
          )}
        </div>
      </div>
    </div>
    // </div>
  );
};

export default StatisticsPage;
