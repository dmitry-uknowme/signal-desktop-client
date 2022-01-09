import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import useActions from 'renderer/hooks/useActions';

const TerritoryTable = () => {
  const { fetchCarsOnTerritory } = useActions();
  const carsOnTerritory = useSelector((store) => store.cars.on_territory);

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
          number,
          organizationShortName,
          weightBrutto,
          cargoCategoryTitle,
          cargoTypeTitle,
          dateOfEnter,
        }) => (
          <tr key={id}>
            <td>{number}</td>
            <td>{organizationShortName || 'Не определено'}</td>
            <td>{weightBrutto}</td>
            <td>{cargoCategoryTitle || 'Не определено'}</td>
            <td>{cargoTypeTitle || 'Не определено'}</td>
            <td>{dateOfEnter || 'Не определено'}</td>
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
