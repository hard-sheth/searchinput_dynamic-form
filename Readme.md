# searchinput_dynamic-form

React is a JavaScript library for creating user interfaces. In these library we can create the dynamic form with data of array.

- We can create the Search Input Option at front end side in react js.
- Create Dynamic form with help of array of object

# Example

we have to pass the object From these [
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
1. Search Input 
2. Dynamic Form.


above example is Dynamic Form Example. You can find below attached screen shot to see it's output.


# Screen Shot
![https://drive.google.com/file/d/1lSanXfSQw1kMgQP-op_crmvDHlWB_YAx/view?usp=sharing](image.png)

# implementation
const formdetail =[
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

const formvaluessubmit = (data: object) => {
    console.log(data, "form app");
  };
  const formValue = (data: object) => {
    console.log(data,'data form');
  };

 
<DynamicForm         formValues={formValue} formTitle={'Login Form'} titlePosition="center" formDetails={formdetail}  formclass={`row row-cols-1 row-cols-md-2`}  submitfn={formvaluessubmit} />

# Usage

submitfn : With these we can submit/get the filled data in form.
formValues: With these you can get the values of form with while entering data also(onChange event).