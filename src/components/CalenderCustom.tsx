import {CustomHeader} from "./CalenderHeader";
import * as moment from "moment";
import "react-datepicker/dist/react-datepicker.css";
import * as React from "react";
import DatePicker from "react-datepicker";

type CalenderProp = {
  minDate?: Date;
  maxDate?: Date;
  holidays?: [Holiday];
  icons?: JSX.Element;
  removeParticularDays?: [ParticularDay];
  removeParticularDaysTime?: [String];
  weekendOff: Boolean;
  name?: String;
  onBlur?: any;
  onChange: (event: any) => void;
  ref: (elm: any) => void;
  value?: undefined;
  error?: Boolean;
  showTime: boolean;
  startYear?: number;
  endYear?: number;
  showIcon?: boolean;
  removeTime?: any;
  dateFormat?: string;
  timeIntervals?: number;
  showBottomTime?: boolean;
  excludeTime?: [any];
  changeDate?: (event: any) => void;
};

type Holiday = {
  date: string;
  holidayName: string;
};

type ParticularDay = 0 | 1 | 2 | 3 | 4 | 5 | 6;

/**
 * Description placeholder
 *
 * @param {CalenderProp} props
 * @returns {JSX.Element}
 */

function Calender(props: CalenderProp) {
  const {
    maxDate,
    minDate,
    holidays = [
      { date: "2024-01-14", holidayName: "Uttaryan" },
      { date: "2024-01-15", holidayName: "Vasi Uttaryan" },
    ],
    icons,
    weekendOff,
    removeParticularDays,
    removeParticularDaysTime,
    onChange,
    value,
    error,
    showTime = true,
    startYear,
    endYear,
    showIcon = true,
    dateFormat = "dd/MM/YY",
    timeIntervals = 60,
    changeDate,
    showBottomTime = false,
    excludeTime = [ ],
  } = props;

  const isWeekday = (date: Date) => {
    const weekDay = moment(date).weekday() as ParticularDay;
    if (weekendOff) {
      return weekDay !== 0 && weekDay !== 6;
    } else if (removeParticularDays && removeParticularDays.length > 0) {
      if (removeParticularDays.includes(weekDay)) {
        return false;
      } else {
        return true;
      }
    } else {
      return true;
    }
  };

  const filterPassedTime = (time:any) => {
    const momentselectedDate = moment(time).format('h:mm a');
    return removeParticularDaysTime?.includes(momentselectedDate)
  };

  return (
    <DatePicker
      showIcon={showIcon}
      icon={icons}
      toggleCalendarOnIconClick
      className={`${error ? "is-invalid" : ""} form-control`}
      selected={value}
      onChange={(date) => onChange(date)}
      minDate={minDate}
      maxDate={maxDate}
      dateFormat={dateFormat}
      renderCustomHeader={(item:any) => (
        <CustomHeader {...item} startYear={startYear} endYear={endYear} changeDate={changeDate} />
      )}
      filterDate={isWeekday}
      showTimeInput={showBottomTime}
      showTimeSelect={showTime}
      holidays={[...holidays]}
      excludeTimes={excludeTime}
      filterTime={filterPassedTime}
      timeIntervals={timeIntervals}
    />
  );
}

export {
  Calender
};
