import React from 'react';

const TerritoryTable = () => {
  return (
    <table className="territory__table">
      <tr>
        <th>Гос. номер</th>
        <th>Перевозчик</th>
        <th>Брутто</th>
        <th>Тара</th>
        <th>Нетто</th>
        <th>Категория</th>
        <th>Вид груза</th>
        <th>Дата и время въезда</th>
        {/* <th>Дата и время выезда</th>
        <th>Статус</th> */}
      </tr>
    </table>
  );
};

export default TerritoryTable;
