import { CustomHeader } from "./CalenderHeader";
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
  particlarDayTimes?: [ParticularDay];
  removeParticularDaysTime?: string[][];
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
  timeBreak: string[][];
  changeDate?: (event: any) => void;
  dateRange?: boolean;
  multiDateSelect?: boolean;
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
    holidays = [],
    icons,
    weekendOff,
    removeParticularDays,
    removeParticularDaysTime,
    particlarDayTimes,
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
    excludeTime = [],
    dateRange = false,
    multiDateSelect = true,
    timeBreak = [
      ["10:00", "13:00"],
      ["14:00", "20:00"],
    ],
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

  const getTimeIntervalArray = (timeBreakArray: string[][]) => {
    const timeIntervalArray: any = [];

    timeBreakArray.forEach((timeRange: Array<string>) => {
      const startTime = moment(timeRange[0], "HH:mm");
      const endTime = moment(timeRange[1], "HH:mm");
      console.log(
        startTime.format("d/MM/YYYY h:mm"),
        `startTime endTime`,
        endTime.format("d/MM/YYYY h:mm"),
        startTime.isBefore(endTime),
        `startTime.isBefore(endTime)`,
        timeIntervalArray
      );

      while (startTime.isBefore(endTime)) {
        timeIntervalArray.push(startTime.format("HH:mm"));
        console.log(startTime.format("HH:mm"), 1);
        startTime.add(timeIntervals, "minutes");
        console.log(startTime.format("HH:mm"), 2);
      }
    });

    return timeIntervalArray;
  };

  const filterPassedTime = (time: any) => {
    const momentselectedDate = moment(time).format("H:mm");
    const weekDay = moment(time).weekday() as ParticularDay;
    if (removeParticularDaysTime) {
      const timeIntervalArrayWeekend = getTimeIntervalArray(
        removeParticularDaysTime
      );
      const timeIntervalArray = getTimeIntervalArray(timeBreak);
      if (particlarDayTimes?.includes(weekDay)) {
        return timeIntervalArrayWeekend?.includes(momentselectedDate);
      } else {
        return timeIntervalArray?.includes(momentselectedDate);
      }
    } else {
      return true;
    }
  };

  return (
    <DatePicker
      showIcon={showIcon}
      icon={icons}
      toggleCalendarOnIconClick
      className={`${error ? "is-invalid" : ""} form-control`}
      selected={
        Array.isArray(value) && dateRange && !multiDateSelect
          ? value[0]
          : multiDateSelect
          ? null
          : value
      }
      selectedDates={multiDateSelect?value:value}
      onChange={(dates: Date | null | [Date | null, Date | null] | Date[]) => {
        onChange(dates);
      }}
      minDate={minDate}
      maxDate={maxDate}
      dateFormat={dateFormat}
      renderCustomHeader={(item: any) => (
        <CustomHeader
          {...item}
          startYear={startYear}
          endYear={endYear}
          changeDate={changeDate}
        />
      )}
      filterDate={isWeekday}
      showTimeInput={showBottomTime}
      showTimeSelect={showTime}
      holidays={[...holidays]}
      excludeTimes={excludeTime}
      filterTime={filterPassedTime}
      timeIntervals={timeIntervals}
      startDate={Array.isArray(value) && dateRange ? value[0] : undefined}
      selectsRange={dateRange?true:undefined}
      endDate={Array.isArray(value) && dateRange ? value[1] : undefined}
      selectsMultiple={multiDateSelect?true:undefined}
      shouldCloseOnSelect={!dateRange && !multiDateSelect}
      disabledKeyboardNavigation
    />
  );
}

export { Calender };
