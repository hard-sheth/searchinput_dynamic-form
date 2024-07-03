import  DatePicker from "react-datepicker";
import {CustomHeader} from "./CalenderHeader";
import * as moment from "moment";
import "react-datepicker/dist/react-datepicker.css";

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

function CalenderCustom(props: CalenderProp) {
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
    // includeTime = [
    //   // new Date(0, 0, 0, 8, 0, 0), // 8:00 AM
    //   // new Date(0, 0, 0, 9, 0, 0), // 9:00 AM
    //   new Date(0, 0, 0, 10, 0, 0), // 10:00 AM
    //   new Date(0, 0, 0, 11, 0, 0), // 11:00 AM
    //   new Date(0, 0, 0, 12, 0, 0), // 12:00 PM
    //   new Date(0, 0, 0, 13, 0, 0), // 1:00 PM
    //   new Date(0, 0, 0, 14, 0, 0), // 2:00 PM
    //   new Date(0, 0, 0, 15, 0, 0), // 3:00 PM
    //   new Date(0, 0, 0, 16, 0, 0), // 4:00 PM
    //   new Date(0, 0, 0, 17, 0, 0), // 5:00 PM
    // ],
    excludeTime = [
      // new Date(0, 0, 0, 10, 0, 0),
      // new Date(0, 0, 0, 11, 0, 0),
      // new Date(0, 0, 0, 12, 0, 0),
      // new Date(0, 0, 0, 13, 0, 0),
      // new Date(0, 0, 0, 14, 0, 0),
      // new Date(0, 0, 0, 15, 0, 0),
      // new Date(0, 0, 0, 16, 0, 0),
      // new Date(0, 0, 0, 17, 0, 0),
      // new Date(0, 0, 0, 18, 0, 0),
      // new Date(0, 0, 0, 19, 0, 0),
      // new Date(0, 0, 0, 20, 0, 0),
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
      // includeDates={[moment().toDate()]}
      // timeInputLabel="Time:"
      showTimeInput={showBottomTime}
      showTimeSelect={showTime}
      holidays={[...holidays]}
      excludeTimes={excludeTime}
      // includeTimes={moment(value).weekday() === 6 ? includeTime : excludeTime}
      // includeTimes={()=>getIncludeTimes(value)}
      filterTime={filterPassedTime}
      timeIntervals={timeIntervals}
    />
  );
}

export {
  CalenderCustom
};
