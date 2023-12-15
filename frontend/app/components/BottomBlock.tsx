import React from 'react';

interface BottomBlockProps {
  day: string;
}

const BottomBlock: React.FC<BottomBlockProps> = ({ day }) => {
  return (
    <>
      <div className="bottomBlock">
        <div className="bBlockChosen">Выбранный день: {day}</div>
        <div className="isWorkDayWrapper">
          <input type="checkbox" id="isWorkDayCheckbox"></input>
          <label htmlFor="isWorkDayCheckbox" className="bBlockIsWork">
            Рабочий день
          </label>
        </div>

        <label htmlFor="comment" className="labelComment">
          Комментарий:
        </label>
        <textarea id="comment" rows={4} />
        <div className="workPlaceWrapper">
          <label htmlFor="workPlaceInput">Место работы:</label>
          <input type="text" id="workPlaceInput" />
        </div>
        <button className="bBlockSubmit">Обновить</button>
      </div>
    </>
  );
};

export default BottomBlock;
