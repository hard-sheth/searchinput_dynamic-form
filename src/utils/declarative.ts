import { Inputfields } from "src/components/DynamicForm";

type Holiday = {
  date: Date | string;
  holidayName: string;
};

type ParticularDay = 1 | 2 | 3 | 4 | 5 | 6 | 0;

export type Calender = {
  type: "date" | "datetime" | "time" | "daterange" | "datetimerange";
  isrange: boolean;
  showIcon: boolean;
  showTime: boolean;
  icon?: JSX.Element;
  maximumDate?: Date;
  minimumDate?: Date;
  weekDaysOff?: boolean;
  holidays?: [Holiday];
  removeParticularDays: [ParticularDay];
  dateFormat?: string;
} & Inputfields;

export type CalenderTime = {
  showTime: true;
  type: "time";
  removeTime?: [];
  includeTime?: [];
  timePicker: "Bottom" | "side";
  timeIntervals: number;
} & Inputfields;

function isCalender(item: Inputfields): item is Calender {
  return (
    item.type === "date" ||
    item.type === "datetime" ||
    item.type === "time" ||
    item.type === "daterange" ||
    item.type === "datetimerange"
  );
}

export { isCalender };
