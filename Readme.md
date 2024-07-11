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

#### DynamicForm

```typescript
import { DynamicForm } from "searchinput_dynamic-form";
import {  useState } from "react";

function App() {
  const [selectValue, setSelectValue] = useState("");
  const formValue = (data: object) => {
      console.log(data,'data form');
    };
  const formvaluessubmit = (data: object) => {
      console.log(data, "form app");
    };
  return <DynamicForm         formValues={formValue} formTitle={'Login Form'} titlePosition="center" formDetails={createForm}  formclass={`row row-cols-1 row-cols-md-2`}  submitfn={formvaluessubmit} />
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
              {" "}
              I certify that I am at least 18 years old and that i agree to the{" "}
              <Link href={`/terms`}>Terms & Condition</Link> and{" "}
              <span className="text-primary border-bottom border-primary">
                Privacy Policy
              </span>
              . This service is for the India only.{" "}
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