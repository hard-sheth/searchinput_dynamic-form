# searchinput_dynamic-form

React is a JavaScript library for creating user interfaces. In these library we can create the dynamic form with data of array.

- We can create the Search Input Option at front end side in react js.
- Create Dynamic form with help of array of object

## Installation

Install searchinput_dynamic-form with npm

```bash
 npm install searchinput_dynamic-form
 yarn add searchinput_dynamic-form
```
    
## Documentation
# Example

we have to pass the object From these 

    
    [
        {
            name: "username",
            type: "text",
            placeholder: "Please enter your email or username.",
            lable: "Username",
            validationobj: {
            required: {
                value: true,
                message: "Please pass the userName",
            },
            },
            somemsg: "user Name |email",
        },
        {
            name: "useremail",
            type: "email",
            placeholder: "Please enter your email.",
            lable: "UserEmail",
            validationobj: {
            required: {
                value: true,
                message: "Please pass the useremail",
            },
            },
            somemsg: "user email",
        },
        {
            name: "account",
            type: "secure",
            placeholder: "Please enter Some Private Info.",
            lable: "Private Info *",
            validationobj: {
            required: {
                value: true,
                message: "Please pass  Some Private Info.",
            },
            },
        },
        {
            name: "age",
            type: "number",
            placeholder: "Please enter your age.",
            lable: "age",
            validationobj: {
            required: {
                value: true,
                message: "Please pass the useremail",
            },
            min: {
                value: 0,
                message: "The age shoudl not be less than 0",
            },
            max: {
                value: 150,
                message: "The age shoudl not be greater than 150",
            },
            },
            somemsg: "user age",
        },
        {
            name: "amount",
            type: "float",
            placeholder: "Please enter amount.",
            lable: "Amount",
        },
        {
            name: "password",
            type: "password",
            placeholder: "Please enter your Password.",
            lable: "Password",
            validationobj: {
            required: {
                value: true,
                message: "Please pass the pass",
            },
            },
            somemsg: "Password should container 1 upper letter",
        },
        {
            name: "Address",
            type: "textarea",
            placeholder: "Please enter your Address.",
            lable: "Address * ",
            validationobj: {
            required: {
                value: true,
                message: "Please pass the address",
            },
            },
            maininputclass: "col-12 col-md-12",
        },
        {
            name: "gender",
            type: "radio",
            lable: "Gender",
            placeForLabel: "inline",
            validationobj: {
            required: {
                value: true,
                message: "Please select gender",
            },
            },
            options: [
            { label: "Male", value: "male" },
            { label: "Female", value: "female" },
            { label: "Other", value: "other" },
            ],
            maininputclass: "col-12 col-md-12",
        },
        {
            name: "accept",
            type: "checkbox",
            validationobj: {
            required: {
                value: true,
                message: "Please read tearms & condition",
            },
            },
            options: [
            { label: "Please accept Tearms & condition", value: true },
            ],
            maininputclass: "col-12 col-md-12",
        },
    ];
    

Here you can get the two Components
- Search Input 
- Dynamic Form.
- Table
- Calender
- FormDynamic

above example is Dynamic Form Example. You can find below attached screen shot to see it's output.


# Screen Shot
![https://drive.google.com/file/d/1lSanXfSQw1kMgQP-op_crmvDHlWB_YAx/view?usp=sharing](image.png)

# implementation
```const formdetail =[
  {
    name: "username",
    type: "text",
    placeholder: "Please enter your email or username.",
    lable: "Username",
    validationobj: {
      required: {
        value: true,
        message: "Please pass the userName",
      },
    },
    somemsg: "user Name |email",
  },
  {
    name: "useremail",
    type: "email",
    placeholder: "Please enter your email.",
    lable: "UserEmail",
    validationobj: {
      required: {
        value: true,
        message: "Please pass the useremail",
      },
    },
    somemsg: "user email",
  },
  {
    name: "account",
    type: "secure",
    placeholder: "Please enter Some Private Info.",
    lable: "Private Info *",
    validationobj: {
      required: {
        value: true,
        message: "Please pass  Some Private Info.",
      },
    },
  },
  {
    name: "age",
    type: "number",
    placeholder: "Please enter your age.",
    lable: "age",
    validationobj: {
      required: {
        value: true,
        message: "Please pass the useremail",
      },
      min: {
        value: 0,
        message: "The age shoudl not be less than 0",
      },
      max: {
        value: 150,
        message: "The age shoudl not be greater than 150",
      },
    },
    somemsg: "user age",
  },
  {
    name: "amount",
    type: "float",
    placeholder: "Please enter amount.",
    lable: "Amount",
  },
  {
    name: "password",
    type: "password",
    placeholder: "Please enter your Password.",
    lable: "Password",
    validationobj: {
      required: {
        value: true,
        message: "Please pass the pass",
      },
    },
    somemsg: "Password should container 1 upper letter",
  },
  {
    name: "Address",
    type: "textarea",
    placeholder: "Please enter your Address.",
    lable: "Address * ",
    validationobj: {
      required: {
        value: true,
        message: "Please pass the address",
      },
    },
    maininputclass: "col-12 col-md-12",
  },
  {
    name: "gender",
    type: "radio",
    lable: "Gender",
    placeForLabel: "inline",
    validationobj: {
      required: {
        value: true,
        message: "Please select gender",
      },
    },
    options: [
      { label: "Male", value: "male" },
      { label: "Female", value: "female" },
      { label: "Other", value: "other" },
    ],
    maininputclass: "col-12 col-md-12",
  },
  {
    name: "accept",
    type: "checkbox",
    validationobj: {
      required: {
        value: true,
        message: "Please read tearms & condition",
      },
    },
    options: [
      { label: "Please accept Tearms & condition", value: true },
    ],
    maininputclass: "col-12 col-md-12",
  },
];
```

const formvaluessubmit = (data: object) => {
    console.log(data, "form app");
  };
  const formValue = (data: object) => {
    console.log(data,'data form');
  };

```bash
<DynamicForm formValues={formValue} formTitle={'Login Form'} titlePosition="center" formDetails={formdetail}  formclass={`row row-cols-1 row-cols-md-2`}  submitfn={formvaluessubmit} />

```

# Usage

submitfn : With these we can submit/get the filled data in form.
formValues: With these you can get the values of form with while entering data also(onChange event).

## Usage/Examples

#### SearchOptions

```typescript
import { SearchOptions } from "searchinput_dynamic-form";
import {  useState } from "react";

function App() {
  const [selectValue, setSelectValue] = useState("");
    const updteRecord = (data: string) => {
    setSelectValue(data);
  };
  return <SearchOptions optionNullMsg={<span>Sorry! No data found!</span>} btnPlace="RIGHT" btnText={<span>Search</span>} isLoading={isLoading} isReload={reload} loadingText="Loading..." selectOptions={data} updateText={updteRecord} startSearch="type" />
}
```

#### Table

```typescript
import { TableReact, PaginationReact } from "searchinput_dynamic-form";
import {  useState } from "react";

function App() {
  const [pageSize, setPageSize] = useState(10);
  const [tabledata, setTableData] = useState([]);
  const defaultColumns = [
  {
    header: "Name",
    columns: [
      {
        accessorKey: "firstName",
        id: "firstName",
        header: "First Name",
        meta: {
          filterVariant: "search",
        },
      },
      {
        accessorKey: "lastName",
        id: "lastName",
        header: () => <span>Last Name</span>,
        meta: {
          filterVariant: "search",
        },
      },
    ],
  },
  {
    accessorKey: "age",
    id: "age",
    header: "Age",
    meta: {
      filterVariant: "number",
    },
  },
  {
    accessorKey: "visits",
    id: "visits",
    header: "Visits",
    meta: {
      filterVariant: "range",
    },
  },
  {
    accessorKey: "status",
    id: "status",
    header: "Status",
    meta: {
      filterVariant: "select",
      options: ["single", "relationship", "complicated"],
      isMulti: false,
    },
  },
  {
    accessorKey: "progress",
    id: "progress",
    header: "Profile Progress",
    meta: {
      filterVariant: "search",
    },
  },
  ];
  const formValue = (data: object) => {
      console.log(data,'data form');
  };
  const formvaluessubmit = (data: object) => {
      console.log(data, "form app");
  };
  const updatePageNo = (pageNo: number) => {
    console.log(pageNo, "pageNo");
    setCurrentPage(pageNo)
    setTableData(makeData(pageSize))
  };
  const updatePageSize = (pageCount: number) => {
    setPageSize(pageCount)
    setTableData([])
  };
  const sorted = (data: Object) => {
    console.log(data,'sorted');
  };

  const filterd = (data: Object) => {
    console.log(data,'filterd');
  };
  return(
    <> 
      <TableReact columns={defaultColumns} data={tabledata} filter={true} sorting={true} updateFilter={filterd} updateSorting={sorted} />
      <PaginationReact
          totalPages={2}
          showSelectOptions={true}
          selectOptions={[5, 10, 15, 20, 25, 50]}
          updatePageClick={updatePageNo}
          updatePageSize={updatePageSize}
          position="between"
      />
    </>
  )
}
```


#### CustomForm

```typescript
import { CustomForm } from "searchinput_dynamic-form";
import {  useState } from "react";

function App() {
    const createForm: inputTypesDiff[] = [
    {
      name: "username",
      type: "text",
      placeholder: "Please enter your email or username.",
      lable: "Full Name *",
      validationobj: {
        required: {
          value: true,
          message: "Please Enter Full Name.",
        },
      },
      maininputclass: "col-12 col-md-12",
    },
    {
      type: "radio",
      name: "gender",
      lable: "Gender *",
      radioOptions: [
        { label: `Male`, value: "male" },
        { label: `Female`, value: "female" },
        { label: `Other`, value: "other" },
      ],
      placeForLabel: "inline",
      classinput: "col-12",
      maininputclass: "col-12 col-md-12",
      validationobj: {
        required: {
          value: true,
          message: `Please Select Gender.`,
        },
      },
    },
    {
      name: "agree",
      type: "checkbox",
      options: [
        {
          label: (
            <>              
              I certify that I am at least 18 years old and that i agree to the
              <Link href={`/terms`}>Terms & Condition</Link> and
              <span className="text-primary border-bottom border-primary">
                Privacy Policy
              </span>
              . This service is for the India only.
            </>
          ),
        },
      ],
      maininputclass: "col-12 col-md-12",
    },
    {
      type: "file",
      accept: "image/png",
      clearable: true,
      isMulti: true,
      isPreview: true,
      name: "fileupload",
      uploadBtn: 'Upload btn',
      maininputclass: "col-12 col-md-12",
      square: true,
    },
  ];
  const formValue = (data: object) => {
      console.log(data,'data form');
    };
  const formvaluessubmit = (data: object) => {
      console.log(data, "form app");
    };
  return  <CustomForm
        formValues={formValue}
        titlePosition="center"
        formDetails={createForm}
        formclass={`row row-cols-1 row-cols-md-2`}
        submitfn={formvaluessubmit}
        btnPosition="center"
        resetbtn={true}
      />
}
```

#### FormDynamic

```typescript
import { FormDynamic, inputTypesDiffDynamic } from "searchinput_dynamic-form";
import {  useState } from "react";

function App() {
    const createForm: inputTypesDiffDynamic[] = [
    {
      type: 'date',
      name: 'startdate',
      dateFormat: 'dd/MM/yyyy',
      lable: "Start Date *",
      validationobj: {
        required: {
          value: true,
          message: 'Please select start Date'
        }
      },
      // value: new Date(  ),
      holidays: [
        {
          date: '2024-07-30',
          holidayName: 'Swap Leave'
        }
      ],
      weekendOff: false,
      removeParticularDays: [2],
      excludeDates: [
        new Date()
      ]
    },
    {
      type: 'date',
      name: 'enddate',
      dateFormat: 'dd/MM/yyyy',
      lable: "End Date *",
      validationobj: {
        required: {
          value: true,
          message: 'Please select End Date'
        },
      },
      // value: new Date(  ),
      holidays: [
        {
          date: '2024-07-30',
          holidayName: 'Swap Leave'
        }
      ],
      weekendOff: false,
      removeParticularDays: [2],
      excludeDates: [
        new Date()
      ],
      dependableFormName:'startdate',
      dependableFormError: 'End Date Is Not Valid',
      dependableType: 'Date',
      operation:'smallerequal'
    },
    {
      type: 'daterange',
      name: 'startdateRange',
      dateFormat: 'dd/MM/yyyy',
      lable: "Start Date Range *",
      validationobj: {
        required: {
          value: true,
          message: 'Please select Date Range'
        }
      },
      // value: new Date(  ),
      holidays: [
        {
          date: '2024-07-30',
          holidayName: 'Swap Leave'
        }
      ],
      weekendOff: false,
      removeParticularDays: [2],
      excludeDates: [
        new Date()
      ],
    },
    {
      type: 'datetime',
      name: 'startdatetime',
      dateFormat: 'dd/MM/yyyy h:mm',
      lable: "Start Time *",
      validationobj: {
        required: {
          value: true,
          message: 'Please select start Date time'
        }
      },
      // value: new Date(  ),
      holidays: [
        {
          date: '2024-07-30',
          holidayName: 'Swap Leave'
        }
      ],
      weekendOff: false,
      // removeParticularDays: [1],
      excludeDates: [
        new Date()
      ],
      timeIntervals: 30,
      particularDayTime: [1, 6],
      particularDaysTiming: [
        [
          '11:00', '18:00'
        ]
      ],
      excludeDatesList: [
        {
          date: '2024-7-25',
          time: [
            ['10:00', '13:00'],
            ['14:00', '16:00']
          ]
        },
        {
          date: '2024-7-29',
          time: [
            ['11:00', '13:00'],
            ['14:30', '16:31']
          ]
        }
      ],
      minTime: '10:30',
      maxTime: '20:30'
    }
  ];
  const formValue = (data: object) => {
      console.log(data,'data form');
    };
  const formvaluessubmit = (data: object) => {
      console.log(data, "form app");
    };
  return  <FormDynamic
        formValues={formValue}
        titlePosition="center"
        formDetails={createForm}
        formclass={`row row-cols-1 row-cols-md-2`}
        submitfn={formvaluessubmit}
        btnPosition="center"
        resetbtn={true}
      />
}
```

# Calender Input Properties

For the Calender we have used moment library. Where we have declared the above properties which are used for Calender Component. For Calender purpose we have used properties which are used for the Calender.
        

### Breakdown of the Enhancements Calendar
#### minDate :  `string`

- **Type**: `string`| `undefined`
- **Format**: The date should be provided in the ISO 8601 format (YYYY-MM-DD). For example, `"2024-01-01"` represents January 1, 2024.
- **Description**: Minimum date which can be selected from Calendar.

#### maxDate :  `string`

- **Type**: `string`| `undefined`
- **Format**: The date should be provided in the ISO 8601 format (YYYY-MM-DD). For example, `"2024-01-01"` represents January 1, 2024.
- **Description**: Maximum date which can be selected from Calendar.
#### holidays :  `Array.<Holiday>`

- **Type**: `Array.<Holiday>`|`undefined`
- **Format**: ```type Holiday =  {date: string ,holidayName: string } ```
- **Description**: Array of holidays. Which can be useful when hover on date. holidayName will display on calendar.

#### dateFormat: `string`
- **Type**: `string`
- **Format**: 
    | formatDate | Description
    | :-------- | :------- 
    | MMMM | Display full name month.
    | yyyy | Full Year.
    | yy | year displau like 24.
    | MM | no of month like 01,02 like that.
    | aa | Display am or pm.
    | H | In 24 hour format.
    | h | In 12 hour format.
    | mm | Display Minutes.
    | d | date display.
    | ad | date in double digit display.
- **Description**: When display on calendar input what kind of value should appear on input. Combination of above format will be applied in property dateFormat.

#### startYear: `number`|`undefined`
- **Type**: `number`|`undefined`
- **Format**: The year should be applied in number. For example `2024` represents year 2024.
- **Description**: In Calendar we get dropdown year start from startYear provided number.
- **Default**: 1950

#### endYear: `number`|`undefined`
- **Type**: `number`|`undefined`
- **Format**: The year should be applied in number. For example `2024` represents year 2024.
- **Description**: In Calendar we get dropdown year last year which is available to select in calendar is endYear.
- **Default**: Current year

#### weekendOff: `boolean`|`undefined`
- **Type**:  `boolean`|`undefined`
- **Format**: `true`|`false`|`undefined`
- **Description**:On weekend we want to disable seletion of date is disabled.
- **Default**: Current year
  
#### icons: `JSX.Element`|`undefined`
- **Type**: `JSX.Element`|`undefined`
- **Format**: Currently it has support of react-icons libary.
- **Description**: Want to change the Icon of calendar.

#### removeParticularDays: `Array.<number>`|`undefined`
- **Type**: `Array.<number>`|`undefined`
- **Format**: Provided in array<number>. For example [0,6]. number should between 0-6.
- **Description**: To disable date selection of particualr day of week. For example [3] is passed than Wednesday dates can't be selected.

#### showIcon: `boolean`|`undefined`
- **Type**: `boolean`|`undefined`
- **Format**: `true`|`false`.
- **Description**: To display icon on input of calendar.

#### name : `string`
- **Type**: Requried
- **Format**: `string`.
- **Description**: Name of property.

#### label: `string`| `JSX.Element`|`undefined`
- **Type**: Optional
- **Format**: `string`| `JSX.Element`.
- **Description**: Name of property.

#### labelClass: `string`|`undefined`
- **Type**: Optional
- **Format**: `string`.
- **Description**: Class is applied over form-label .

#### validationobj: `object`|`undefined`
- **Type**: Optional
- **Format**: `object`.
- **Description**: We want to apply validation. To learn more about it review `https://developer.mozilla.org/en-US/docs/Learn/Forms/Form_validation`

#### somemsg: `string`| `JSX.Element`|`undefined`
- **Type**: Optional
- **Format**: `string`| `JSX.Element`.
- **Description**: Below input element want to display something.

#### maininputclass: `string`|`undefined`
- **Type**: Optional
- **Format**: `string`.
- **Description**: Class is applied over parent element. Class is applied over top of input & label.

#### excludeDates `Array.<Date>`|`undefined`
- **Type**: Optional
- **Format**: Provided in array<Date>. For example [`new Date()`].
- **Description**: To disable date selection for particualr dates.

#### value:`any`|`undefined`
- **Type**: Optional
- **Format**: any.
- **Description**: Value of input

#### dependableFormName: `string`|`undefined`
- **Type**: Optional
- **Format**: Provided in array<Date>. For example [`new Date()`].
- **Description**: To know the value of other form input. For example we have two inputs which are account no & confirm account no. We want to knoe value of account no in  confirm account no input form.

#### operation: `string`|`never`
- **Type**: Optional
- **Format**: `compare`|`greater`|`smaller`|`greaterequal`|`smallerequal`|`notequal`|`Promise`|`never`.
- **Description**: Based on dependableFormName value & current input value. If dependableFormName property declared than operation is **Requried**.

#### dependableType: `string`|`never`
- **Type**: Optional
- **Format**: `Number`| `Date`| `String`|`never`.
- **Description**: dependableFormName value type. If dependableFormName property declared than operation is **Requried**.

#### dependableFormError: `string`|`never`
- **Type**: Optional
- **Format**: `string`|`never`.
- **Description**: dependable input field validation failed or got an error. If dependableFormName property declared than operation is **Requried**.

#### dependablePromise: `any`|`never`
- **Type**: Optional
- **Format**: 
    ```
    (
        currentField: any,
        dependantField: any
    ) => true | string
    ```
- **Description**: dependable operation is Promise than dependablePromise is **Requried**.

#### type: `string`
- **Type**: Requried
- **Format**: `date`|`datetime`|`daterange`.
- **Description**: based on these properties input will be updated.
#### timeIntervals: `number`
- **Type**: Requried
- **Format**: number. For example 60 represents `1-2 am` like this.
- **Description**: In calendar to select time from 12 am to 12 pm. 

#### minTime: `string`
- **Type**: Optional
- **Format**: `string`|`undefined`.
- **Description**: minimum time which can be selected from calendar.
#### maxTime: `string`
- **Type**: Optional
- **Format**: `string`|`undefined`.
- **Description**: maximum time which can be selected from calendar
#### particularDayTime:  Array<number>`
- **Type**: Optional
- **Format**: ` Array<number>`|`undefined`.
- **Description**: Provided in array<number>. For example [0,6]. number should between 0-6.
#### particularDaysTiming: `Array<Array<string>>`
- **Type**: Optional
- **Format**: `Array<Array<string>>`|`undefined`. For example `[['8:30','16:30']]` represents time 8:30 AM to 4:30 PM
- **Description**: Based on timing like 8:30 to 16:30 one break.particularDayTime mentioned than these property **Requried**
#### excludeDatesList: `
- **Type**: Optional
- **Format**:
    For example

     ```
    date: '2024-08-01',
    time: [
                ['8:30','12:30'],
                ['13:30','18:30'],
           ]
    ``` 
    represents on date `"2024-08-01"`. We have timeing
        
        1. '8:30' to '12:30'
        2. '13:30' to '18:30'  
    time will be selected `'8:30 AM'` to `'12:30 PM'` & `'1:30 PM'` to `'6:30 PM'`
- **Description**: On mentioned date whatever time mentioned than it will select time between them. 