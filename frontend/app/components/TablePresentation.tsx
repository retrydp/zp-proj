import React from 'react';
import { TArray } from '../page';
import { weekDayName, weekRows } from '../utils/constants';
import clsx from 'clsx';

interface TablePresentationProps {
  array: TArray[];
}

export const TablePresentation: React.FC<TablePresentationProps> = ({
  array,
}: TablePresentationProps) => {
  const [chunkTable, setChunkTable] = React.useState<TArray[][]>([]);

  React.useEffect(() => {
    if (array.length) {
      const chunks = Array.from({ length: weekRows }, (_, rowIdx) => {
        const startIdx = rowIdx * weekDayName.length;
        const endIdx = startIdx + weekDayName.length;
        return array.slice(startIdx, endIdx);
      });
      setChunkTable(chunks);
    }
  }, [array.length]);
  return (
    <>
      {chunkTable.map((week) => (
        <div className="weekLine" key={week[0].day}>
          {week.map(({ day, active }) => {
            return (
              <div
                key={day}
                className={clsx('singleDay', {
                  dayActive: active,
                  dayInactive: !active,
                })}
              >
                {day}
              </div>
            );
          })}
        </div>
      ))}
    </>
  );
};
