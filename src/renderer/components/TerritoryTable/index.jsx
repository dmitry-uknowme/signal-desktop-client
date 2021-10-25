import React, { useState, useEffect } from 'react';

const TerritoryTable = () => {
  const [carsOnTerritory, setCarsOnTerritory] = useState(null);
  const fetchCarsOnTerritory = async () => {
    fetch('http://localhost:8000/cars_on_territory')
      .then((response) => response.json())
      .then((res) => setCarsOnTerritory(res))
      .catch((e) => console.log('error', e));
  };
  useEffect(() => {
    fetchCarsOnTerritory();
  }, []);
  return (
    <table className="territory__table">
      <tr>
        <th>Гос. номер</th>
        <th>Перевозчик</th>
        <th>Брутто</th>
        <th>Категория</th>
        <th>Вид груза</th>
        <th>Дата и время въезда</th>
      </tr>
      {carsOnTerritory?.map(
        ({
          id,
          number_plate,
          transporter_company,
          weight_brutto,
          cargo_category,
          cargo_type,
          date_of_enter,
        }) => (
          <tr key={id}>
            <td>{number_plate}</td>
            <td>{transporter_company}</td>
            <td>{weight_brutto}</td>
            <td>{cargo_category}</td>
            <td>{cargo_type}</td>
            <td>{date_of_enter}</td>
          </tr>
        )
      )}
    </table>
  );
};

export default TerritoryTable;
