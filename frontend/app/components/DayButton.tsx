import React from 'react';
import clsx from 'clsx';
import { TArray } from './Main';
interface DayButtonProps {
  day: number;
  currentDate: string;
  data: TArray['data'];
  active: boolean;
}

const DayButton: React.FC<DayButtonProps> = ({
  day,
  active,
  data,
  currentDate,
}) => {
  return (
    <button
      key={day}
      data-day={currentDate.replace(/\d+$/, '') + day}
      className={clsx('singleDay', {
        dayActive: active,
        dayInactive: !active,
        hasData: Boolean(data),
      })}
    >
      {day}
      {data?.comment && <div className="badge badge-primary">!</div>}
      {data?.payed && <div className="badge badge-payed">$</div>}
    </button>
  );
};

export default DayButton;
