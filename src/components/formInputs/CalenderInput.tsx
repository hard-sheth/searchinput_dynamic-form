import "react-datepicker/dist/react-datepicker.css";
import moment from "moment";
import * as React from "react";
import DatePicker from "react-datepicker";
import {
  ControllerFieldState,
  ControllerRenderProps,
  FieldValues,
  UseFormStateReturn,
} from "react-hook-form";
import { CalenderPropInput, ParticularDay } from "../../utils/calender";
import { CustomHeader } from "../Calender/CalenderHeader";

type CalenderProps = {
  field: ControllerRenderProps<FieldValues, string>;
  fieldState: ControllerFieldState;
  formState: UseFormStateReturn<FieldValues>;
  item: CalenderPropInput;
};
function CalenderInput({ field, fieldState, formState, item }: CalenderProps) {
  if (item.type === "date") {
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
        filterDate={isWeekday}
        holidays={item.holidays ? [...item.holidays] : []}
        dateFormat={item.dateFormat}
        onChange={(dates: Date | null | [Date | null, Date | null]) => {
          field.onChange(dates);
        }}
        isClearable={true}
      />
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
        startDate={field.value[0] ? field.value[0] : null}
        endDate={field.value[1] ? field.value[1] : null}
        onChange={(dates: Date | null | [Date | null, Date | null]) => {
          field.onChange(dates);
        }}
        isClearable={true}
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
      if (item.removeParticularDaysTime) {
        const timeIntervalArrayWeekend = getTimeIntervalArray(
          item.removeParticularDaysTime
        );
        const timeIntervalArray = getTimeIntervalArray(item.timeBreak);
        if (item.particlarDayTimes?.includes(weekDay)) {
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
      />
    );
  }
}

export { CalenderInput };
