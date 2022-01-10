import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import useActions from 'renderer/hooks/useActions';

const TerritoryTable = () => {
  const { fetchCarsOnTerritory } = useActions();
  const carsOnTerritory = useSelector((store) => store.cars.on_territory.items);
  useEffect(() => {
    fetchCarsOnTerritory();
  }, []);
  return carsOnTerritory?.length ? (
    <table className="territory__table">
      {/* <thead> */}
      <tr>
        <th>Гос. номер</th>
        {/* <th>Контрагент</th> */}
        <th>Перевозчик</th>
        <th>Брутто (г)</th>
        <th>Категория</th>
        <th>Вид груза</th>
        <th>Дата и время въезда</th>
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
          <tr key={id}>
            <td>{truck_number || 'Не определено'}</td>
            <td>{contractor_full_name || 'Не определено'}</td>
            <td>{weight_gross || 'Не определено'}</td>
            <td>{category_title || 'Не определено'}</td>
            <td>{type_title || 'Не определено'}</td>
            <td>{entry_date_time || 'Не определено'}</td>
          </tr>
        )
      )}
      {/* </tbody> */}
    </table>
  ) : (
    ''
  );
};

export default TerritoryTable;
