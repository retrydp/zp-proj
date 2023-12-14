import React from 'react';
import { TArray } from './Main';
import { weekDayName, weekRows } from '../utils/constants';
import clsx from 'clsx';
import DayButton from './DayButton';
import BottomBlock from './BottomBlock';

interface TablePresentationProps {
  array: TArray[];
  currentDate: string;
}

export const TablePresentation: React.FC<TablePresentationProps> = ({
  array,
  currentDate,
}: TablePresentationProps) => {
  const [chunkTable, setChunkTable] = React.useState<TArray[][]>([]);
  const [activeDay, setActiveDay] = React.useState<string>('');

  const dayHandler = (event: React.SyntheticEvent<HTMLDivElement>) => {
    setActiveDay(
      (event.currentTarget.children[0] as HTMLButtonElement).dataset.day ?? ''
    );
  };

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
          {week.map(({ day, active, data }) => {
            return (
              <div
                key={day}
                className="buttonBlock"
                onClick={(e) => (active ? dayHandler(e) : null)}
              >
                <DayButton {...{ day, active, data, currentDate }} />
              </div>
            );
          })}
        </div>
      ))}
      {activeDay && <BottomBlock day={activeDay} />}
    </>
  );
};
