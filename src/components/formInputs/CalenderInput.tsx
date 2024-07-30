import "react-datepicker/dist/react-datepicker.css";
import moment from "moment";
import * as React from "react";
import DatePicker, { DatePickerProps } from "react-datepicker";
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
        onChange={(dates: Date | null | [Date | null, Date | null]) => {
          field.onChange(dates);
        }}
      />
    );
  } else if (item.type === "datetime") {
    const filterPassedTime = (time: Date) => {
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
      />
    );
  }
}

export { CalenderInput };
