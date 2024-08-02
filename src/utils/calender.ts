import {
  inputTypesDiffDynamic,
  DependableFormPromise,
  DependableForm,
  NotDependableForm,
} from "./sample";

type Holiday = {
  date: string;
  holidayName: string;
};

/**
 * General parameters for Calendar.
 * @param {Date} minDate - Minimum Date which can be Selected.
 * @param {Date} maxDate - Maximum Date which can be Selected.
 * @param {Holiday} holidays - The Array of holiday. Which can be selected/can't select those Date .
 * @param {string} dateFormat - DateFormat should be MM/DD/YYYY like these.
 * @param {number} startYear - minimum year which can be selected in Calender.
 * @param {number} endYear - maximum year which can be selected in Calender.
 * @param {boolean} weekendOff - If we want to deselect/disabled on weekend.
 * @param {ParticularDay[]} removeParticularDays - Only those dates will only eliminate/deselect/disabled for date select.
 * @param {boolean} showIcon - When we want to show icon or not in input side.
 */

type CalenderProp = {
  minDate?: string;
  maxDate?: string;
  holidays?: Holiday[];
  dateFormat?: string;
  startYear?: number;
  endYear?: number;
  weekendOff?: boolean;
  icons?: JSX.Element;
  removeParticularDays?: ParticularDay[];
  showIcon?: boolean;
  name: string;
  label?: string | JSX.Element;
  labelClass?: string;
  validationobj?: object;
  somemsg?: string | JSX.Element;
  maininputclass?: string;
  value?: unknown;
  excludeDates?: Date[];
  dependableFormName?: string;
};

type CalenderPropInputProp = CalenderProp &
  (
    | ((DependableForm | DependableFormPromise) & {
        dependableFormName: string;
      })
    | NotDependableForm
  );

/**
 * Parameters for Calendar for only Dates.
 * @param {'date'} type - Only Date will be shown.
 * @param {string} propertyname - name of property which we will update in form.
 * @param {object} details - in object which can update object.
 *
 */

export type CalenderPropInputDate = CalenderPropInputProp & {
  type: "date";
};

/**
 * Parameters for Calendar for only Date range.
 * @param {'daterange'} type - List of dates where we can start date & end date. Between select start date & end date it will select all those dates.
 */

export type CalnderDateRange = CalenderPropInputProp & {
  type: "daterange";
};

/**
 * Parameters for Calendar for Dates & Time.
 * @export
 * @typedef {CalnderDateTime}
 * @param {'datetime'} type - Date & Time will be shown in input.
 * @param {string[][]} timeBreak - A 2D array of strings On every day where we can have list of start time & end time an array. When start time & end time which can be used for can select those time betweem them.
 * @param {*} excludeTime - In the exclude time in those selected time which can't be select.
 * @param {ParticularDay[]} particularDayTime - On specific Days what shoule we do.
 * @param {number} timeIntervals - timeinterval which can be interval for time select.
 * @param {string[][]} ParticularDaysTiming - On particular day of week what kind of time should be applied.
 * @param {ParticularDay[]} particlarDayTimes - Day of week where which can be time select can be changed.
 * @param {string } minTime - Day of week where which can be time select can be changed.
 * @param {string} maxTime - Day of week where which can be time select can be changed.
 * @param {ExcludeDateTime[]} excludeDatesList - These property have when we want to on particular date. Set on that date some particular time. We have nested object or properties date, time.
 */

export type CalnderDateTimeProps = CalenderPropInputProp & {
  type: "datetime";
  // timeBreak?: string[][];
  timeIntervals: number;
  minTime?: string;
  maxTime?: string;
  particularDayTime?: ParticularDay[];
  excludeDatesList?: ExcludeDateTime[];
};

type WithParticularDayTime = {
  particularDayTime: ParticularDay[];
  particularDaysTiming: string[][];
};

type WithoutParticularDayTime = {
  particularDayTime?: undefined;
  particularDaysTiming?: never;
};

type ExcludeDateTime = {
  date: string;
  time: string[][];
};

export type CalnderDateTime = CalnderDateTimeProps &
  (WithParticularDayTime | WithoutParticularDayTime);

type Hour = string & { __brand: "Hour" };

// // Custom type guard function
export function isHourValid(value: string): value is Hour {
  const timeString = value.split(":");
  if (timeString.length === 2) {
    return true;
  } else {
    return false;
  }
}

// Custom type guard function for date only.
export function isDateValid(value: string) {
  const dateString = new Date(value);
  return dateString instanceof Date && !isNaN(dateString.getTime());
}

export type ParticularDay = 0 | 1 | 2 | 3 | 4 | 5 | 6;

export function isCalender(params: CalenderPropInput | inputTypesDiffDynamic) {
  return (
    params.type === "date" ||
    params.type === "datetime" ||
    params.type === "daterange"
  );
}

export type CalenderPropInput =
  | CalnderDateRange
  | CalnderDateTime
  | CalenderPropInputDate;

// type CalnderDateTimefields<T> = T & {
//   particlarDayTime?: ParticularDay[]; // This property controls the presence of dependentProperty
// } & (T extends { particlarDayTime: ParticularDay[] }
//     ? { particularDaysTiming: string[][] } // If isEnabled is true, dependentProperty must exist
//     : { particularDaysTiming?: never }); // If isEnabled is false or not present, dependentProperty should not exist

// // Function to create an Hour
// function createHour(value: number): Hour {
//   if (!isHour(value)) {
//     throw new Error(`Value ${value} is not a valid hour`);
//   }
//   return value as Hour;
// }

// type Inputfields<T> = T & {
//   successValidation?: boolean; // This property controls the presence of dependentProperty
// } & (T extends { successValidation: true }
//     ? { successValidationMessage: string } // If isEnabled is true, dependentProperty must exist
//     : { successValidationMessage?: never }); // If isEnabled is false or not present, dependentProperty should not exist
// type InputOptionList = Inputfields<InputfieldsOptions> & {
//   type:
//     | "text"
//     | "search"
//     | "textarea"
//     | "telephone"
//     | "password"
//     | "email"
//     | "searchoption"
//     | "switch";
// };

// type InputfieldsOptions = {
//   lable?: string | JSX.Element;
//   lableClass?: string;
//   placeholder?: string;
//   validation?: boolean;
//   rightplaceText?: string | JSX.Element;
//   leftplaceText?: string | JSX.Element;
//   rightClass?: string;
//   leftClass?: string;
//   classinput?: string;
//   maininputclass?: string;
//   validationobj?: object;
//   name: string;
//   defaultvalue?: string;
//   somemsg?: string | JSX.Element;
//   value?: any;
//   maxInput?: number;
//   minInput?: number;
// };

// type Inputfields<T> = T & {
//   successValidation?: boolean; // This property controls the presence of dependentProperty
// } & (T extends { successValidation: true }
//     ? { successValidationMessage: string } // If isEnabled is true, dependentProperty must exist
//     : { successValidationMessage?: never }); // If isEnabled is false or not present, dependentProperty should not exist

// type InputOptionList = Inputfields<InputfieldsOptions> & {
//   type:
//     | "text"
//     | "search"
//     | "textarea"
//     | "telephone"
//     | "password"
//     | "email"
//     | "searchoption"
//     | "switch";
// };
