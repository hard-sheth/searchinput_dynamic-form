import moment from "moment";
import * as React from "react";
// import 'moment-timezone';

interface HeaderOfCalender {
  date: Date | undefined;
  decreaseMonth: () => void;
  increaseMonth: () => void;
  prevMonthButtonDisabled: boolean;
  nextMonthButtonDisabled: boolean;
  changeYear: (date: any) => void;
  changeMonth: (date: any) => void;
  changeDate?: (date: any) => void;
  startYear?: number;
  endYear?: number;
}

/**
 * Description placeholder
 *
 * @param {HeaderOfCalender} param0
 * @param {*} param0.date
 * @param {() => void} param0.decreaseMonth
 * @param {() => void} param0.increaseMonth
 * @param {boolean} param0.prevMonthButtonDisabled
 * @param {boolean} param0.nextMonthButtonDisabled
 * @param {(date: any) => void} param0.changeYear
 * @param {(date: any) => void} param0.changeMonth
 * @param {number} [param0.startYear=1930]
 * @param {(date: any) => void} param0.changeDate
 * @param {number} [param0.endYear=new Date().getFullYear()]
 * @returns {*}
 */
const CustomHeader = ({
  date,
  decreaseMonth,
  increaseMonth,
  prevMonthButtonDisabled,
  nextMonthButtonDisabled,
  changeYear,
  changeMonth,
  startYear = 1930,
  changeDate,
  endYear = moment().get('year'),
}: HeaderOfCalender) => {
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const years = [];

  for (let year = startYear; year <= endYear; year++) {
    years.push(year);
  }

  return (
    <div className="d-flex">
      <button
        type="button"
        className={`btn btn-light`}
        onClick={() => {
          decreaseMonth();
          if (changeDate) {
            changeDate(date);
          }
        }}
        disabled={prevMonthButtonDisabled}
      >
        {`<`}
      </button>
      <select
        className="form-select"
        value={moment(date).month()}
        onChange={({ target: { value } }) => {
          if (changeDate) {
            changeDate(value);
          }
          changeMonth(value);
        }}
      >
        {months.map((option, index) => (
          <option key={option} value={index}>
            {option}
          </option>
        ))}
      </select>
      <span>{moment(date).format("MMMM YYYY")}</span>
      <select
        className="form-select"
        value={moment(date).year()}
        onChange={({ target: { value } }) => {
          changeYear(value);
          if (changeDate) {
            changeDate(value);
          }
        }}
      >
        {years.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
      <button
        type="button"
        className={`btn btn-light`}
        onClick={() => {
          increaseMonth();
          if (changeDate) {
            changeDate(date);
          }
        }}
        disabled={nextMonthButtonDisabled}
      >
        {">"}
      </button>
    </div>
  );
};

export { CustomHeader };
