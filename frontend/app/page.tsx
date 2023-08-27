'use client';
import dayjs from 'dayjs';
import { useSearchParams, useRouter } from 'next/navigation';
import React from 'react';
import { TablePresentation } from './components/TablePresentation';
import { defaultFormat, weekDayName, weekRows } from './utils/constants';
import { ClipLoader } from 'react-spinners';
export interface TArray {
  day: number;
  active: boolean;
}

export default function Home() {
  const dateInUrl = useSearchParams().get('date');
  const today = dayjs(new Date()).format(defaultFormat);
  const router = useRouter();
  const [tableArray, setTableArray] = React.useState<TArray[]>([]);

  const dateHelper = () => {
    return {
      daysInCurrentMonth: dayjs(dateInUrl).daysInMonth(),
      firstDayByCount: dayjs(dateInUrl).startOf('month').day(),
      daysInPrevMonth: dayjs(dateInUrl).subtract(1, 'month').daysInMonth(),
    };
  };

  const generateTableArray = (
    firstDay: number,
    daysCount: number
  ): TArray[] => {
    const head = Array.from({ length: firstDay - 1 }, (_, idx) => ({
      day: dayjs(dateInUrl)
        .subtract(1, 'month')
        .endOf('month')
        .subtract(idx, 'day')
        .date(),
      active: false,
    })).reverse();
    const main = Array.from({ length: daysCount }, (_, idx) => ({
      day: idx + 1,
      active: true,
      data: null,
    }));
    const tail = Array.from(
      {
        length: weekRows * weekDayName.length - daysCount - head.length,
      },
      (_, idx) => ({ day: idx + 1, active: false })
    );
    return [...head, ...main, ...tail];
  };

  const dateParamValidation = (date: string | null) => {
    const regexPattern = /^\d{4}\-(0?[1-9]|1[012])\-(0?[1-9]|[12][0-9]|3[01])$/;
    const match = date?.match(regexPattern);
    return Boolean(match);
  };

  React.useEffect(() => {
    if (!dateParamValidation(dateInUrl)) {
      router.push(`?date=${today}`);
    }
    const { firstDayByCount, daysInCurrentMonth } = dateHelper();

    setTableArray(generateTableArray(firstDayByCount, daysInCurrentMonth));
  }, [dateInUrl]);

  const linkHandler = (spec: 'subtract' | 'add') => {
    const linkHead = '/?date=';
    const newDate = dayjs(dateInUrl)[spec](1, 'month').startOf('month');
    const formattedDate = newDate.format(defaultFormat);
    const fullLink = linkHead + formattedDate;

    return fullLink;
  };

  const currentDate = dayjs(dateInUrl).format('MMMM YYYY');

  return (
    <>
      <title>{currentDate}</title>
      <main className="app-wrapper">
        <div className="buttonWrapper">
          <a className="navigateLink" href={linkHandler('subtract')}>
            &lt;
          </a>
          <div className="currentDate">{currentDate}</div>
          <a className="navigateLink" href={linkHandler('add')}>
            &gt;
          </a>
        </div>
        <div className="dayNames">
          {weekDayName.map((dayName) => (
            <div className="dayNamesRowItem" key={dayName}>
              {dayName}
            </div>
          ))}
        </div>
        <div className="dateSection">
          {tableArray.length ? (
            <TablePresentation array={tableArray} />
          ) : (
            <div className="spinner">
              <ClipLoader color="#333333" />
            </div>
          )}
        </div>
      </main>
    </>
  );
}
