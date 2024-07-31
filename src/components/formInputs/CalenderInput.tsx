import * as React from "react";
import moment from "moment";
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './customCalender.css'
import {
  ControllerFieldState,
  ControllerRenderProps,
  FieldValues,
  UseFormStateReturn,
} from "react-hook-form";
import { CalenderPropInput, isHourValid, ParticularDay } from "../../utils/calender";
import { CustomHeader } from "../Calender/CalenderHeader";

type CalenderProps = {
  field: ControllerRenderProps<FieldValues, string>;
  fieldState: ControllerFieldState;
  formState: UseFormStateReturn<FieldValues>;
  item: CalenderPropInput;
};
function CalenderInput({ field, fieldState, formState, item }: CalenderProps) {
  if (item.type === "date") {
    const [removeDates, setRemoveDates] = React.useState([])
    const isWeekday = (date: Date) => {
      const weekDay = moment(date).weekday() as ParticularDay;
      if (item.weekendOff) {
        return weekDay !== 0 && weekDay !== 6;
      } else if (
        item.removeParticularDays &&
        item.removeParticularDays.length > 0
      ) {
        if (item.removeParticularDays.includes(weekDay)) {
          return false;
        } else {
          return true;
        }
      } else {
        return true;
      }
    };
    const Dateselect = moment('2024-07-30').toString()
    console.log(item.excludeDates, 'exclude date', Dateselect);

    return (
      <div className="w-100">
        <DatePicker
          showIcon={item.showIcon}
          icon={item.icons}
          selected={field.value}
          toggleCalendarOnIconClick
          className={`form-control ${fieldState.error ? "is-invalid" : ""} `}
          renderCustomHeader={(item: any) => (
            <CustomHeader
              {...item}
              startYear={item.startYear}
              endYear={item.endYear}
              changeDate={item.changeDate}
            />
          )}
          filterDate={isWeekday}
          holidays={item.holidays ? [...item.holidays] : []}
          dateFormat={item.dateFormat}
          onChange={(dates: Date | null | [Date | null, Date | null]) => {
            field.onChange(dates);
          }}
          isClearable={true}
          excludeDates={item.excludeDates}
        />
      </div>
    );
  } else if (item.type === "daterange") {
    const isWeekday = (date: Date) => {
      const weekDay = moment(date).weekday() as ParticularDay;
      if (item.weekendOff) {
        return weekDay !== 0 && weekDay !== 6;
      } else if (
        item.removeParticularDays &&
        item.removeParticularDays.length > 0
      ) {
        if (item.removeParticularDays.includes(weekDay)) {
          return false;
        } else {
          return true;
        }
      } else {
        return true;
      }
    };
    return (
      <DatePicker
        showIcon={item.showIcon}
        icon={item.icons}
        toggleCalendarOnIconClick
        className={`form-control ${fieldState.error ? "is-invalid" : ""} `}
        renderCustomHeader={(item: any) => (
          <CustomHeader
            {...item}
            startYear={item.startYear}
            endYear={item.endYear}
            changeDate={item.changeDate}
          />
        )}
        holidays={item.holidays ? [...item.holidays] : []}
        dateFormat={item.dateFormat}
        selectsRange={true}
        filterDate={isWeekday}
        startDate={field.value ? field.value[0] : null}
        endDate={field.value ? field.value[1] : null}
        onChange={(dates: Date | null | [Date | null, Date | null]) => {
          field.onChange(dates);
        }}
        isClearable={true}
        excludeDates={item.excludeDates}
      />
    );
  } else if (item.type === "datetime") {
    const getTimeIntervalArray = (timeBreakArray: string[][]) => {
      const timeIntervalArray: string[] = [];
      timeBreakArray.forEach((timeRange: Array<string>) => {
        const startTime = moment(timeRange[0], "HH:mm");
        const endTime = moment(timeRange[1], "HH:mm");
        while (startTime.isBefore(endTime)) {
          timeIntervalArray.push(startTime.format("HH:mm"));
          startTime.add(item.timeIntervals, "minutes");
        }
      });

      return timeIntervalArray;
    };
    const filterPassedTime = (time: Date) => {
      const momentselectedDate = moment(time).format("H:mm");
      const weekDay = moment(time).weekday() as ParticularDay;
      console.log(item.particlarDayTime, 'item.removeParticularDaysTime', item.particularDaysTiming);

      if (item.particularDaysTiming && item.particlarDayTime) {
        const timeIntervalArrayWeekend = getTimeIntervalArray(
          item.particularDaysTiming
        );
        console.log(item.timeBreak, weekDay,'timebreak', timeIntervalArrayWeekend,timeIntervalArrayWeekend.includes(momentselectedDate) && item.particlarDayTime.includes(weekDay),'weeks');
        if(item.particlarDayTime.includes(weekDay)){
          if (timeIntervalArrayWeekend.includes(momentselectedDate)) {
            console.log('show some day time');
            
            return true
          } else {
            console.log('hode some day time');
            return false
          }
        }
        else{
          console.log('normal days');
          
          return true
        }
        // return timeIntervalArrayWeekend.includes(momentselectedDate) && item.particlarDayTime.includes(weekDay) ? true : false;
      } else {
        console.log('normal');
        return true;
      }
    };

    return (
      <DatePicker
        showIcon={item.showIcon}
        icon={item.icons}
        toggleCalendarOnIconClick
        className={`form-control ${fieldState.error ? "is-invalid" : ""} `}
        renderCustomHeader={(item: any) => (
          <CustomHeader
            {...item}
            startYear={item.startYear}
            endYear={item.endYear}
            changeDate={item.changeDate}
          />
        )}
        holidays={item.holidays ? [...item.holidays] : []}
        dateFormat={item.dateFormat}
        onChange={(dates: Date | null | [Date | null, Date | null]) => {
          field.onChange(dates);
        }}
        filterTime={filterPassedTime}
        showTimeSelect
        isClearable={true}
        excludeDates={item.excludeDates}
        minTime={moment().set('hour', item.minTime && isHourValid(item.minTime) ? Number(item.minTime.split(':')[0]) : 0).set('minute', item.minTime && isHourValid(item.minTime) ? Number(item.minTime.split(':')[1]) : 0).set('second', 0).toDate()}
        maxTime={moment().set('hour', item.maxTime && isHourValid(item.maxTime) ? Number(item.maxTime.split(':')[0]) : 23).set('minute', item.maxTime && isHourValid(item.maxTime) ? Number(item.maxTime.split(':')[1]) : 59).set('second', 59).toDate()}
      />
    );
  }
  else {
    <p>Calendar component</p>
  }
}

export default CalenderInput;
