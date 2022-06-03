import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import useActions from '../../hooks/useActions'
import Button from '../base/Button'
import { setIsModalExitOpened } from '../../store/reducers/modalReducer'
import getTotalPages from '../../utils/getTotalPages'

const PAGE_LIMIT = 10

const TerritoryTable = () => {
  const dispatch = useDispatch()
  const { fetchCarsOnTerritory } = useActions()
  const carsOnTerritory = useSelector(store => store.cars.on_territory.items)
  const [selectedCar, setSelectedCar] = useState()
  const countOfCars = useSelector(
    store => store.cars.on_territory.totalItemCount
  )
  const [countOfPages, setCountOfPages] = useState(
    getTotalPages(countOfCars, PAGE_LIMIT)
  )
  const [currentPage, setCurrentPage] = useState(1)

  useEffect(() => {
    fetchCarsOnTerritory(currentPage, PAGE_LIMIT)
  }, [currentPage])

  useEffect(() => {
    setCountOfPages(getTotalPages(countOfCars, PAGE_LIMIT))
  }, [carsOnTerritory, countOfCars])

  useEffect(() => {
    fetchCarsOnTerritory(currentPage, PAGE_LIMIT)
    setCountOfPages(getTotalPages(countOfCars, PAGE_LIMIT))
  }, [])
  return carsOnTerritory?.length ? (
    <>
      <table className="territory__table">
        {/* <thead> */}
        <tr className="table__head">
          <th>Гос. номер</th>
          {/* <th>Контрагент</th> */}
          <th>Перевозчик</th>
          <th>Брутто (кг)</th>
          <th>Категория</th>
          <th>Вид груза</th>
          <th>Дата и время въезда</th>
          {/* <th>Действия</th> */}
        </tr>
        {/* </thead> */}
        {/* <tbody> */}
        {/* {carsOnTerritory?.map(
        ({
          id,
          number_plate,
          contractor_company,
          transporter_company,
          weight_brutto,
          cargo_category,
          cargo_type,
          date_of_enter,
        }) => (
          <tr key={id}>
            <td>{number_plate}</td>
            <td>{contractor_company}</td>
            <td>{transporter_company}</td>
            <td>{weight_brutto}</td>
            <td>{cargo_category}</td>
            <td>{cargo_type}</td>
            <td>{date_of_enter}</td>
          </tr>
        )
      )} */}
        {carsOnTerritory?.map(
          ({
            id,
            truck_number,
            contractor_full_name,
            weight_gross,
            category_title,
            type_title,
            entry_date_time,
          }) => (
            <tr
              className="table__row"
              key={id}
              title={`Создать запись на выезд для ${truck_number}`}
              onClick={() =>
                dispatch(
                  setIsModalExitOpened({
                    selectedCar: id,
                  })
                )
              }
            >
              <td className="table__cell">{truck_number || 'Не определено'}</td>
              <td className="table__cell">
                {contractor_full_name || 'Не определено'}
              </td>
              <td className="table__cell">{weight_gross || 'Не определено'}</td>
              <td className="table__cell">
                {category_title || 'Не определено'}
              </td>
              <td className="table__cell">{type_title || 'Не определено'}</td>
              <td className="table__cell">
                {entry_date_time || 'Не определено'}
              </td>
              {/* <td>
              <Button label="Выпустить" />
            </td> */}
            </tr>
          )
        )}
        {/* </tbody> */}
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
              <div className="pagination__item _active">{currentPage}</div>
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
                    style={{ cursor: 'default', background: 'coral' }}
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
    </>
  ) : (
    ''
  )
}

export default TerritoryTable
