import { CustomHeader } from "./CalenderHeader";
import moment from "moment";
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
  ref?: (elm: any) => void;
  value?: undefined;
  error?: Boolean;
  showTime?: boolean;
  startYear?: number;
  endYear?: number;
  showIcon?: boolean;
  removeTime?: any;
  dateFormat?: string;
  timeIntervals?: number;
  showBottomTime?: boolean;
  excludeTime?: [any];
  timeBreak?: string[][];
  changeDate?: (event: any) => void;
  dateRange?: boolean;
  multiDateSelect?: boolean;
  excludeScrollbar?: boolean,
  onSelect?: (date: Date) => void,
};

type Holiday = {
  date: string;
  holidayName: string;
};

type ParticularDay = 0 | 1 | 2 | 3 | 4 | 5 | 6;

/**
 * React-datepicker update component by prop which should be updated in component.
 *
 * @param {CalenderProp} props//Calnder which can be configured for jsx element.
 * @param {Date} props.minDate //minimum date where which should be selected.
 * @param {Date} props.maxDate //maximum date which can be selected.
 * @param {Date} props.holidays //These holiday related calender. With date & it's name.
 * @param {[ParticularDay]} props.removeParticularDays //Day of week where which can't be selected. If weekendOff on/true than these will won't work.
 * @param {[ParticularDay]} props.particlarDayTimes //Day of week where which can be time select can be changed.
 * @param {String[][]} props.removeParticularDaysTime //On particular day of week what kind of time should be applied.
 * @param {Boolean} props.weekendOff //On these where we can't select saturday & sunday (weekends).
 * @param {Number} props.timeIntervals //timeinterval which can be interval for time select.
 * @param {Boolean} props.dateRange //It should be date range in the Calender. From start date & end date all between those date will be covered.
 * @param {Boolean} props.multiDateSelect //It can select multiple date. When we select multiple date which can be non related with each other.
 * @param {Boolean} props.showTime //Which can showtime when it comes true than it can select the time.
 * @param {Number} props.startYear //It shows/should be start of the year in the calender which can be started in the dropdown of year.
 * @param {Number} props.endYear //End option of select which can be listed in select.
 * @param {String[][]} props.timeBreak //On every day where we can have list of start time & end time an array. When start time & end time which can be used for can select those time betweem them.
 * @param {*} props.excludeTime //In the exclude time in those selected time which can't be select.
 * @param {Boolean} props.showIcon //should show icon true or false.
 * 
 * @returns {JSX.Element}
 */

function Calender(props: CalenderProp|any): JSX.Element {
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
    showTime = false,
    startYear,
    endYear,
    showIcon = true,
    dateFormat = "dd/MM/YY",
    timeIntervals = 60,
    changeDate,
    showBottomTime = false,
    excludeTime = [],
    dateRange = false,
    multiDateSelect = false,
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
      while (startTime.isBefore(endTime)) {
        timeIntervalArray.push(startTime.format("HH:mm"));
        startTime.add(timeIntervals, "minutes");
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
      selectedDates={multiDateSelect?value:undefined}
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
      shouldCloseOnSelect={!dateRange && multiDateSelect}
      disabledKeyboardNavigation
      {...props}
    />
  );
}

export { Calender };
