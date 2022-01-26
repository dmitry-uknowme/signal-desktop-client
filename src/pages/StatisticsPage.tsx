/* eslint-disable no-nested-ternary */
import React, { useState, useEffect } from 'react'
import Button from '../components/base/Button'
import ruRu from 'rsuite/locales/ru_RU'
import useActions from '../hooks/useActions'
import { useSelector } from 'react-redux'
import { DateRangePicker, CustomProvider } from 'rsuite'
import axios from 'axios'
import getTotalPages from '../utils/getTotalPages'
import localizeCount from '../utils/localizeCount'

const PAGE_LIMIT = 10
const API_URL = 'http://127.0.0.1:81/v1'
const StatisticsPage = () => {
  const [contractors, setContractors] = useState()
  const [cargoCategories, setCargoCategories] = useState()
  const [cargoTypes, setCargoTypes] = useState()
  const { fetchAllCars } = useActions()
  const allCars = useSelector(store => store.cars.all.items)
  const totalWeight = useSelector(store => store.cars.all.totalWeight)
  const countOfCars = useSelector(store => store.cars.all.totalItemCount)
  const [countOfPages, setCountOfPages] = useState(
    getTotalPages(countOfCars, PAGE_LIMIT)
  )
  const [currentPage, setCurrentPage] = useState(1)

  // const changeDateHandler = (e) => {
  //   console.log('calendar', e);

  // };
  // console.log(
  //   'storeee',
  //   useSelector((store) => store.cars.all)
  // );
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
      `${API_URL}/getOrganizations?role=ROLE_TRANSPORTER`
    )
    setContractors(contractorResponse.data.items)

    const cargoCategoriesResponse = await axios.get(
      `${API_URL}/getCargoCategories`
    )
    setCargoCategories(cargoCategoriesResponse.data.items)

    const cargoTypesResponse = await axios.get(`${API_URL}/getCargoTypes`)
    setCargoTypes(cargoTypesResponse.data.items)
  }

  useEffect(() => {
    fetchAllCars(currentPage, PAGE_LIMIT)
  }, [currentPage])

  useEffect(() => {
    setCountOfPages(getTotalPages(countOfCars, PAGE_LIMIT))
  }, [allCars, countOfCars])

  useEffect(() => {
    fetchAllCars(currentPage, PAGE_LIMIT)
    setCountOfPages(getTotalPages(countOfCars, 2))
    fetchDropdownFields()
  }, [])
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
                <br />
                <CustomProvider locale={ruRu}>
                  <DateRangePicker
                    className="stats__filter stats__date-picker d-xl-block"
                    size="sm"
                    format="dd.MM.yy"
                    placeholder="дд.мм.гг-дд.мм.гг"
                    showOneCalendar
                    placement="bottomEnd"
                    onChange={e => console.log('date', e)}
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
                        <th>Брутто (кг)</th>
                        <th>Тара (кг)</th>
                        <th>Нетто (кг)</th>
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
                          weight_net,
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
                            <td>{weight_net}</td>
                            <td>{category_title || 'Не определено'}</td>
                            <td>{type_title || 'Не определено'}</td>
                            <td>{entry_date_time || 'Не определено'}</td>
                            <td>{check_out_date_time || 'Не определено'}</td>
                            <td>
                              {status === 'STATUS_ANNULLED'
                                ? 'Аннулирован'
                                : status === 'STATUS_ON_PLATFORM'
                                ? 'На платформе'
                                : status === 'STATUS_ON_TERRITORY'
                                ? 'На территории'
                                : status === 'STATUS_COMPLETED'
                                ? 'Завершен'
                                : ''}
                            </td>
                          </tr>
                        )
                      )}
                    </tbody>
                  </table>
                  {countOfPages > 1 && (
                    <div className="pagination mt-4">
                      <div className="col-md-6 offset-md-3">
                        <div className="pagination__items d-flex justify-content-center w-100">
                          {currentPage > 1 && (
                            <div
                              className="pagination__item"
                              style={{
                                fontSize: '1.4rem',
                              }}
                              onClick={() => setCurrentPage(state => state - 1)}
                            >
                              ‹
                            </div>
                          )}
                          {countOfPages > 5 && currentPage > 2 && (
                            <div
                              className="pagination__item"
                              onClick={() => setCurrentPage(1)}
                            >
                              1
                            </div>
                          )}
                          {countOfPages > 5 && currentPage >= 4 && (
                            <div
                              className="pagination__item"
                              style={{ cursor: 'default', background: 'coral' }}
                            >
                              ...
                            </div>
                          )}
                          {currentPage > 1 && (
                            <div
                              className="pagination__item"
                              onClick={() => setCurrentPage(state => state - 1)}
                            >
                              {currentPage - 1}
                            </div>
                          )}
                          <div className="pagination__item _active">
                            {currentPage}
                          </div>
                          {currentPage + 1 < countOfPages && (
                            <div
                              className="pagination__item"
                              onClick={() => setCurrentPage(currentPage + 1)}
                            >
                              {currentPage + 1}
                            </div>
                          )}
                          {currentPage + 2 < countOfPages && (
                            <div
                              className="pagination__item"
                              onClick={() => setCurrentPage(currentPage + 2)}
                            >
                              {currentPage + 2}
                            </div>
                          )}
                          {currentPage + 3 < countOfPages && (
                            <div
                              className="pagination__item"
                              onClick={() => setCurrentPage(currentPage + 3)}
                            >
                              {currentPage + 3}
                            </div>
                          )}
                          {countOfPages > 5 &&
                            currentPage < countOfPages - 1 &&
                            currentPage < countOfPages - 4 && (
                              <div
                                className="pagination__item"
                                style={{
                                  cursor: 'default',
                                  background: 'coral',
                                }}
                              >
                                ...
                              </div>
                            )}
                          {currentPage < countOfPages && (
                            <div
                              className="pagination__item"
                              onClick={() => setCurrentPage(countOfPages)}
                            >
                              {countOfPages}
                            </div>
                          )}
                          {currentPage < countOfPages && (
                            <div
                              className="pagination__item"
                              style={{
                                fontSize: '1.4rem',
                                transform: 'rotate(-180deg)',
                              }}
                              onClick={() =>
                                setCurrentPage(state =>
                                  state < countOfPages ? state + 1 : state
                                )
                              }
                            >
                              ‹
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
              <div className="row mt-5">
                <div className="stats__summary text-uppercase font-bold">
                  Итого: {totalWeight} кг ({countOfCars}{' '}
                  {localizeCount('взвешиван', countOfCars, ['ие', 'ия', 'ий'])})
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
  )
}

export default StatisticsPage
