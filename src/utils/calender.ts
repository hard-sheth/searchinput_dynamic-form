type Holiday = {
  date: string;
  holidayName: string;
};
/**
 * Update indexed form values
 *
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
export type CalenderPropInputProp = {
  minDate?: Date;
  maxDate?: Date;
  holidays?: Holiday[];
  dateFormat?: string;
  startYear?: number;
  endYear?: number;
  weekendOff?: boolean;
  icons?: JSX.Element;
  removeParticularDays?: ParticularDay[];
  showIcon?: boolean;
};

/**
 * Update indexed form values
 *
 * @param {'date'} type - Only Date will be shown.
 * @param {string} propertyname - name of property which we will update in form.
 * @param {object} details - in object which can update object.
 *
 */

export type CalenderPropInputDate = CalenderPropInputProp & {
  type: "date";
};

/**
 * Update indexed form values
 *
 * @param {'daterange'} type - List of dates where we can start date & end date. Between select start date & end date it will select all those dates.
 * @param {string} propertyname - name of property which we will update in form.
 */

export type CalnderDateRange = CalenderPropInputProp & {
  type: "daterange";
};

/**
 * Description placeholder
 *
 * @export
 * @typedef {CalnderDateTime} 
 * @param {'datetime'} type - Date & Time will be shown in input.
 * @param {string[][]} timeBreak - A 2D array of strings On every day where we can have list of start time & end time an array. When start time & end time which can be used for can select those time betweem them.
 * @param {*} excludeTime - In the exclude time in those selected time which can't be select.
 * @param {particlarDayTimes[]} particlarDayTimes - Date & Time will be shown in input.
 * @param {number} timeIntervals - timeinterval which can be interval for time select.
 * @param {string[][]} removeParticularDaysTime - On particular day of week what kind of time should be applied.
 * @param {ParticularDay[]} particlarDayTimes - Day of week where which can be time select can be changed.
 */
export type CalnderDateTime = CalenderPropInputProp & {
  type: "datetime"; 
  timeBreak: string[][];
  excludeTime: [];
  particlarDayTimes: ParticularDay[];
  timeIntervals: number;
  removeParticularDaysTime: string[][];
};

export type CalenderPropInput =
  | CalnderDateRange
  | CalnderDateTime
  | CalenderPropInputDate;

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

export type ParticularDay = 0 | 1 | 2 | 3 | 4 | 5 | 6;

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
